"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CallController = __importStar(require("../controllers/mainController/CallController"));
const LeadController = __importStar(require("../controllers/mainController/LeadController"));
const ConsultationController = __importStar(require("../controllers/mainController/ConsultationController"));
const TransactionHistoryController = __importStar(require("../controllers/mainController/TransactionHistoryController"));
const TransactionController = __importStar(require("../controllers/mainController/TransactionController"));
const WeeklyPerformanceController = __importStar(require("../controllers/mainController/WeeklyPerformanceController"));
const PatientController = __importStar(require("../controllers/mainController/PatientController"));
const FollowUpController = __importStar(require("../controllers/mainController/FollowUpController"));
const ConsultationScheduleController = __importStar(require("../controllers/mainController/ConsultationScheduleController"));
const ConsultationHistoryController = __importStar(require("../controllers/mainController/ConsultationHistoryController"));
const router = express_1.default.Router();
/**
  CALL
 */
router.post("/Call/createCall", CallController.createCall);
router.post("/Call/getAllCalls", CallController.getAllCalls);
router.post("/Call/getCallById", CallController.getCallById);
router.post("/Call/updateCall", CallController.updateCall);
router.post("/Call/deleteCall", CallController.deleteCall);
/**
  CONSULTATION
 */
router.post("/consultation/createConsultation", ConsultationController.createConsultation);
router.post("/consultation/getAllConsultations", ConsultationController.getAllConsultations);
router.post("/consultation/getConsultationById", ConsultationController.getConsultationById);
router.post("/consultation/updateConsultation", ConsultationController.updateConsultation);
router.post("/consultation/deleteConsultation", ConsultationController.deleteConsultation);
/**
  CONSULTATION HISTORY
 */
router.post("/consultation-history/createConsultationHistory", ConsultationHistoryController.createConsultationHistory);
router.post("/consultation-history/getAllConsultationHistory", ConsultationHistoryController.getAllConsultationHistory);
router.post("/consultation-history/getConsultationHistoryById", ConsultationHistoryController.getConsultationHistoryById);
router.post("/consultation-history/updateConsultationHistory", ConsultationHistoryController.updateConsultationHistory);
router.post("/consultation-history/deleteConsultationHistory", ConsultationHistoryController.deleteConsultationHistory);
/**
  CONSULTATION SCHEDULE
 */
router.post("/consultation-schedule/createConsultationSchedule", ConsultationScheduleController.createConsultationSchedule);
router.post("/consultation-schedule/getAllConsultationSchedules", ConsultationScheduleController.getAllConsultationSchedules);
router.post("/consultation-schedule/getConsultationScheduleById", ConsultationScheduleController.getConsultationScheduleById);
router.post("/consultation-schedule/updateConsultationSchedule", ConsultationScheduleController.updateConsultationSchedule);
router.post("/consultation-schedule/deleteConsultationSchedule", ConsultationScheduleController.deleteConsultationSchedule);
/**
  FOLLOW UP
 */
router.post("/follow-up/createFollowUp", FollowUpController.createFollowUp);
router.post("/follow-up/getAllFollowUps", FollowUpController.getAllFollowUps);
router.post("/follow-up/getFollowUpById", FollowUpController.getFollowUpById);
router.post("/follow-up/updateFollowUp", FollowUpController.updateFollowUp);
router.post("/follow-up/deleteFollowUp", FollowUpController.deleteFollowUp);
/**
  LEAD
 */
router.post("/lead/createLead", LeadController.createLead);
router.post("/lead/getAllLeads", LeadController.getAllLeads);
router.post("/lead/getLeadById", LeadController.getLeadById);
router.post("/lead/updateLead", LeadController.updateLead);
router.post("/lead/deleteLead", LeadController.deleteLead);
/**
  PATIENT Controller
 */
router.post("/patient/createPatient", PatientController.createPatient);
router.post("/patient/getAllPatients", PatientController.getAllPatients);
router.post("/patient/getPatientById", PatientController.getPatientById);
router.post("/patient/updatePatient", PatientController.updatePatient);
router.post("/patient/deletePatient", PatientController.deletePatient);
/**
TRANSACTION Controller
*/
router.post("/transaction/createTransaction", TransactionController.createTransaction);
router.post("/transaction/getAllTransactions", TransactionController.getAllTransactions);
router.post("/transaction/getTransactionById", TransactionController.getTransactionById);
router.post("/transaction/updateTransaction", TransactionController.updateTransaction);
router.post("/transaction/deleteTransaction", TransactionController.deleteTransaction);
/**
  TRANSACTION HISTORY
 */
router.post("/transaction-history/createTransactionHistory", TransactionHistoryController.createTransactionHistory);
router.post("/transaction-history/getAllTransactionHistories", TransactionHistoryController.getAllTransactionHistories);
router.post("/transaction-history/getTransactionHistoryById", TransactionHistoryController.getTransactionHistoryById);
router.post("/transaction-history/updateTransactionHistory", TransactionHistoryController.updateTransactionHistory);
router.post("/transaction-history/deleteTransactionHistory", TransactionHistoryController.deleteTransactionHistory);
/**
  WEEKLY PERFORMANCE
 */
router.post("/weekly-performance/createWeeklyPerformance", WeeklyPerformanceController.createWeeklyPerformance);
router.post("/weekly-performance/getAllWeeklyPerformances", WeeklyPerformanceController.getAllWeeklyPerformances);
router.post("/weekly-performance/getWeeklyPerformanceById", WeeklyPerformanceController.getWeeklyPerformanceById);
router.post("/weekly-performance/updateWeeklyPerformance", WeeklyPerformanceController.updateWeeklyPerformance);
router.post("/weekly-performance/deleteWeeklyPerformance", WeeklyPerformanceController.deleteWeeklyPerformance);
exports.default = router;
