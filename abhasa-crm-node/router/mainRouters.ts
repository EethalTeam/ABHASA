import express from "express";

import * as CallController from "../controllers/mainController/CallController";
import * as LeadController from "../controllers/mainController/LeadController";
import * as ConsultationController from "../controllers/mainController/ConsultationController";
import * as TransactionHistoryController from "../controllers/mainController/TransactionHistoryController";
import * as TransactionController from "../controllers/mainController/TransactionController";
import * as WeeklyPerformanceController from "../controllers/mainController/WeeklyPerformanceController";
import * as PatientController from "../controllers/mainController/PatientController";
import * as FollowUpController from "../controllers/mainController/FollowUpController";
import * as ConsultationScheduleController from "../controllers/mainController/ConsultationScheduleController";
import * as ConsultationHistoryController from "../controllers/mainController/ConsultationHistoryController";


const router = express.Router();

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



export default router;