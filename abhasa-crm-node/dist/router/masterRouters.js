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
const AgentController = __importStar(require("../controllers/masterController/AgentController"));
const CountryController = __importStar(require("../controllers/masterController/CountryController"));
const StateController = __importStar(require("../controllers/masterController/StateController"));
const GenderController = __importStar(require("../controllers/masterController/GenderController"));
const CityController = __importStar(require("../controllers/masterController/CityController"));
const ConsultationStatusController = __importStar(require("../controllers/masterController/ConsultationStatusController"));
const LeadRelationController = __importStar(require("../controllers/masterController/LeadRelationController"));
const LeadStatusController = __importStar(require("../controllers/masterController/LeadStatusController"));
const PatientStatusController = __importStar(require("../controllers/masterController/PatientStatusController"));
const PsychologistController = __importStar(require("../controllers/masterController/PsychologistController"));
const ServiceTypeController = __importStar(require("../controllers/masterController/ServiceController"));
const SourceController = __importStar(require("../controllers/masterController/SourceController"));
const TransactionStatusController = __importStar(require("../controllers/masterController/TransactionStatusController"));
const TransactionMethodController = __importStar(require("../controllers/masterController/TransactionMethodController"));
const router = express_1.default.Router();
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
exports.default = router;
