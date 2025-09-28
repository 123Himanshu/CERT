import express from 'express';
import { body, param, query } from 'express-validator';
import { IncidentController } from '../controllers/IncidentController';
import { validateRequest } from '../middleware/validation';
import { upload } from '../middleware/upload';
import { authMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = express.Router();
const incidentController = new IncidentController();

// Get all incidents for the authenticated user
router.get('/', 
  authMiddleware,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status'),
  query('severity').optional().isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid severity'),
  validateRequest,
  incidentController.getIncidents
);

// Get a specific incident by ID
router.get('/:id',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  validateRequest,
  incidentController.getIncidentById
);

// Create a new incident report
router.post('/',
  authMiddleware,
  rateLimiter,
  upload.array('evidence', 10), // Allow up to 10 files
  [
    body('title').notEmpty().withMessage('Title is required').isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('description').notEmpty().withMessage('Description is required').isLength({ min: 50, max: 5000 }).withMessage('Description must be between 50 and 5000 characters'),
    body('incidentType').isIn(['fraud', 'malware', 'phishing', 'espionage', 'opsec', 'other']).withMessage('Invalid incident type'),
    body('severity').isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid severity level'),
    body('location').notEmpty().withMessage('Location is required'),
    body('incidentDate').isISO8601().withMessage('Invalid incident date'),
    body('suspectDetails').optional().isObject().withMessage('Suspect details must be an object'),
    body('financialImpact').optional().isNumeric().withMessage('Financial impact must be a number'),
    body('isUrgent').optional().isBoolean().withMessage('Is urgent must be a boolean'),
    body('contactPreference').isIn(['email', 'phone', 'sms']).withMessage('Invalid contact preference'),
    body('allowSharing').optional().isBoolean().withMessage('Allow sharing must be a boolean')
  ],
  validateRequest,
  incidentController.createIncident
);

// Update an incident
router.put('/:id',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  [
    body('title').optional().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('description').optional().isLength({ min: 50, max: 5000 }).withMessage('Description must be between 50 and 5000 characters'),
    body('status').optional().isIn(['pending', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status'),
    body('severity').optional().isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid severity level')
  ],
  validateRequest,
  incidentController.updateIncident
);

// Add evidence to an incident
router.post('/:id/evidence',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  upload.array('evidence', 5), // Allow up to 5 additional files
  [
    body('description').optional().isLength({ max: 500 }).withMessage('Evidence description must be less than 500 characters')
  ],
  validateRequest,
  incidentController.addEvidence
);

// Get incident evidence
router.get('/:id/evidence',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  validateRequest,
  incidentController.getIncidentEvidence
);

// Download evidence file
router.get('/:id/evidence/:fileId/download',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  param('fileId').isUUID().withMessage('Invalid file ID'),
  validateRequest,
  incidentController.downloadEvidence
);

// Get incident timeline
router.get('/:id/timeline',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  validateRequest,
  incidentController.getIncidentTimeline
);

// Add comment to incident
router.post('/:id/comments',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  [
    body('comment').notEmpty().withMessage('Comment is required').isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters'),
    body('isInternal').optional().isBoolean().withMessage('Is internal must be a boolean')
  ],
  validateRequest,
  incidentController.addComment
);

// Get incident comments
router.get('/:id/comments',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  validateRequest,
  incidentController.getIncidentComments
);

// Request incident status update
router.post('/:id/status-request',
  authMiddleware,
  param('id').isUUID().withMessage('Invalid incident ID'),
  [
    body('message').optional().isLength({ max: 500 }).withMessage('Message must be less than 500 characters')
  ],
  validateRequest,
  incidentController.requestStatusUpdate
);

// Get incident statistics for user
router.get('/stats/overview',
  authMiddleware,
  incidentController.getIncidentStats
);

// Export incident data
router.get('/export',
  authMiddleware,
  query('format').isIn(['csv', 'pdf', 'json']).withMessage('Invalid export format'),
  query('dateFrom').optional().isISO8601().withMessage('Invalid start date'),
  query('dateTo').optional().isISO8601().withMessage('Invalid end date'),
  validateRequest,
  incidentController.exportIncidents
);

export default router;
