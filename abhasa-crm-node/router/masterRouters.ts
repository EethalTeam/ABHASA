import express from "express";
import * as AgentController from "../controllers/masterController/AgentController";
import * as CountryController from "../controllers/masterController/CountryController";
import * as StateController from "../controllers/masterController/StateController";
import * as GenderController from "../controllers/masterController/GenderController";
import * as CityController from "../controllers/masterController/CityController";
import * as ConsultationStatusController from "../controllers/masterController/ConsultationStatusController";
import * as LeadRelationController from "../controllers/masterController/LeadRelationController";
import * as LeadStatusController from "../controllers/masterController/LeadStatusController";
import * as PatientStatusController from "../controllers/masterController/PatientStatusController";
import * as PsychologistController from "../controllers/masterController/PsychologistController";
import * as ServiceTypeController from "../controllers/masterController/ServiceController";
import * as SourceController from "../controllers/masterController/SourceController";
import * as TransactionStatusController from "../controllers/masterController/TransactionStatusController";
import * as TransactionMethodController from "../controllers/masterController/TransactionMethodController";
import * as RefundStatusController from "../controllers/masterController/RefundStatusController";


const router = express.Router();


/**  AGENT
 */
router.post("/agent/createAgent", AgentController.createAgent);
router.post("/agent/getAllAgents", AgentController.getAllAgents);
router.post("/agent/getAgentById", AgentController.getAgentById);
router.post("/agent/updateAgent", AgentController.updateAgent);
router.post("/agent/deleteAgent", AgentController.deleteAgent);

/**  COUNTRY
 */
router.post("/country/createCountry", CountryController.createCountry);
router.post("/country/getAllCountries", CountryController.getAllCountries);
router.post("/country/getCountryById", CountryController.getCountryById);
router.post("/country/updateCountry", CountryController.updateCountry);
router.post("/country/deleteCountry", CountryController.deleteCountry);

/**  STATE
 */
router.post("/state/createState", StateController.createState);
router.post("/state/getAllStates", StateController.getAllStates);
router.post("/state/getStateById", StateController.getStateById);
router.post("/state/updateState", StateController.updateState);
router.post("/state/deleteState", StateController.deleteState);

/**  GENDER
 */
router.post("/gender/createGender", GenderController.createGender);
router.post("/gender/getAllGenders", GenderController.getAllGenders);
router.post("/gender/getGenderById", GenderController.getGenderById);
router.post("/gender/updateGender", GenderController.updateGender);
router.post("/gender/deleteGender", GenderController.deleteGender); 

/**  CITY
 */
router.post("/city/createCity", CityController.createCity);
router.post("/city/getAllCities", CityController.getAllCities);
router.post("/city/getCityById", CityController.getCityById);
router.post("/city/updateCity", CityController.updateCity);
router.post("/city/deleteCity", CityController.deleteCity);

/**  CONSULTATION STATUS
 */
router.post("/consultationStatus/createConsultationStatus", ConsultationStatusController.createConsultationStatus);
router.post("/consultationStatus/getAllConsultationStatuses", ConsultationStatusController.getAllConsultationStatuses);
router.post("/consultationStatus/getConsultationStatusById", ConsultationStatusController.getConsultationStatusById);
router.post("/consultationStatus/updateConsultationStatus", ConsultationStatusController.updateConsultationStatus);
router.post("/consultationStatus/deleteConsultationStatus", ConsultationStatusController.deleteConsultationStatus); 

/**  LEAD RELATION
 */
router.post("/leadRelation/createLeadRelation", LeadRelationController.createLeadRelation); 
router.post("/leadRelation/getAllLeadRelations", LeadRelationController.getAllLeadRelations);
router.post("/leadRelation/getLeadRelationById", LeadRelationController.getLeadRelationById);
router.post("/leadRelation/updateLeadRelation", LeadRelationController.updateLeadRelation);
router.post("/leadRelation/deleteLeadRelation", LeadRelationController.deleteLeadRelation); 

/**  LEAD STATUS
 */
router.post("/leadStatus/createStatus", LeadStatusController.createStatus);
router.post("/leadStatus/getAllStatuses", LeadStatusController.getAllStatuses);
router.post("/leadStatus/getStatusById", LeadStatusController.getStatusById);
router.post("/leadStatus/updateStatus", LeadStatusController.updateStatus);
router.post("/leadStatus/deleteStatus", LeadStatusController.deleteStatus);

/**  PATIENT STATUS
 */
router.post("/patientStatus/createStatus", PatientStatusController.createPatientStatus);
router.post("/patientStatus/getAllStatuses", PatientStatusController.getAllPatientStatuses);
router.post("/patientStatus/getStatusById", PatientStatusController.getPatientStatusById);
router.post("/patientStatus/updateStatus", PatientStatusController.updatePatientStatus);
router.post("/patientStatus/deleteStatus", PatientStatusController.deletePatientStatus);   

/**  PSYCHOLOGIST
 */
router.post("/psychologist/createPsychologist", PsychologistController.createPsychologist);
router.post("/psychologist/getAllPsychologists", PsychologistController.getAllPsychologists);
router.post("/psychologist/getPsychologistById", PsychologistController.getPsychologistById);
router.post("/psychologist/updatePsychologist", PsychologistController.updatePsychologist);
router.post("/psychologist/deletePsychologist", PsychologistController.deletePsychologist);


/**  SERVICE TYPE CONTROLLER */
router.post("/serviceType/createServiceType", ServiceTypeController.createServiceType);
router.post("/serviceType/getAllServiceTypes", ServiceTypeController.getAllServiceTypes);
router.post("/serviceType/getServiceTypeById", ServiceTypeController.getServiceTypeById);
router.post("/serviceType/updateServiceType", ServiceTypeController.updateServiceType);
router.post("/serviceType/deleteServiceType", ServiceTypeController.deleteServiceType);



/**  SOURCE CONTROLLER */
router.post("/source/createSource", SourceController.createSource);
router.post("/source/getAllSources", SourceController.getAllSources);
router.post("/source/getSourceById", SourceController.getSourceById);
router.post("/source/updateSource", SourceController.updateSource);
router.post("/source/deleteSource", SourceController.deleteSource);


/**  TRANSACTION METHOD CONTROLLER */
router.post("/transactionMethod/createTransactionMethod", TransactionMethodController.createTransactionMethod);
router.post("/transactionMethod/getAllTransactionMethods", TransactionMethodController.getAllTransactionMethods);
router.post("/transactionMethod/getTransactionMethodById", TransactionMethodController.getTransactionMethodById);
router.post("/transactionMethod/updateTransactionMethod", TransactionMethodController.updateTransactionMethod);
router.post("/transactionMethod/deleteTransactionMethod", TransactionMethodController.deleteTransactionMethod);


/**  TRANSACTION STATUS CONTROLLER */
router.post("/transactionStatus/createTransactionStatus", TransactionStatusController.createTransactionStatus);
router.post("/transactionStatus/getAllTransactionStatuses", TransactionStatusController.getAllTransactionStatuses);
router.post("/transactionStatus/getTransactionStatusById", TransactionStatusController.getTransactionStatusById);
router.post("/transactionStatus/updateTransactionStatus", TransactionStatusController.updateTransactionStatus);
router.post("/transactionStatus/deleteTransactionStatus", TransactionStatusController.deleteTransactionStatus);

/**  REFUND STATUS CONTROLLER */
router.post("/refundStatus/createRefundStatus", RefundStatusController.createRefundStatus);
router.post("/refundStatus/getAllRefundStatuses", RefundStatusController.getAllRefundStatuses);
router.post("/refundStatus/getRefundStatusById", RefundStatusController.getRefundStatusById);
router.post("/refundStatus/updateRefundStatus", RefundStatusController.updateRefundStatus);
router.post("/refundStatus/deleteRefundStatus", RefundStatusController.deleteRefundStatus);

export default router;
