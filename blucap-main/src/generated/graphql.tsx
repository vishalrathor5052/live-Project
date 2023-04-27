import { api } from 'src/store/query/baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
};

export type AffiliatedRole = {
  __typename?: 'AffiliatedRole';
  department?: Maybe<Scalars['String']>;
  employmentType: EmploymentType;
  from?: Maybe<ExperienceDate>;
  title: Scalars['String'];
  to?: Maybe<ExperienceDate>;
};

export type AffiliatedRoleInput = {
  /** Department */
  department?: InputMaybe<Scalars['String']>;
  /** Employment Type Intern */
  employmentTypeId: Scalars['String'];
  /** Employed from */
  from?: InputMaybe<ExperienceDateInput>;
  /** Role Title */
  title: Scalars['String'];
  /** Employed Till */
  to?: InputMaybe<ExperienceDateInput>;
};

export type AffiliatedWorkExperience = {
  __typename?: 'AffiliatedWorkExperience';
  _id: Scalars['ID'];
  hospital: Hospital;
  role: AffiliatedRole;
  verificationStatus: VerificationStatusEnum;
};

export type AffiliatedWorkExperienceInput = {
  /** Id Of the organization */
  hospitalId: Scalars['String'];
  /** Role */
  role: AffiliatedRoleInput;
};

export type AllocateDutiesToShiftGqlInput = {
  dutyUpdateData: DutyUpdateGqlInput;
  shiftId: Scalars['String'];
};

export type CancelDutyGqlInput = {
  dutyId: Scalars['String'];
  shiftId: Scalars['String'];
  userId: Scalars['String'];
};

export enum CancelledByGqlEnum {
  Others = 'others',
  Self = 'self',
}

export type CreateManagedUserInput = {
  address?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<UserOnboardingGender>;
  managedByHospital?: InputMaybe<Scalars['String']>;
  managedByUser?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

export type CreateNewHospitalInput = {
  address: Scalars['String'];
  name: Scalars['String'];
};

export type CreateShiftsWithTemplateGqlModel = {
  __typename?: 'CreateShiftsWithTemplateGqlModel';
  failed: Array<FailedCreateShiftsWithTemplate>;
  success: Array<SuccessCreateShiftsWithTemplate>;
};

export type DailyTemplatesGqlInput = {
  newTemplateIds: Array<Scalars['String']>;
  reusedTemplateIds: Array<Scalars['String']>;
};

export type Department = {
  __typename?: 'Department';
  _id: Scalars['ID'];
  abbr: Scalars['String'];
  hospital: Hospital;
  name: Scalars['String'];
};

export type DraftDutyChanges = {
  __typename?: 'DraftDutyChanges';
  /** New Users allocated to this shift for duty */
  newAllocations?: Maybe<Array<User>>;
  /** Duties that are being reused (no change) */
  reusedDuties?: Maybe<Array<Duty>>;
};

export type Duty = {
  __typename?: 'Duty';
  _id: Scalars['ID'];
  allocation: User;
  cancelledBy?: Maybe<CancelledByGqlEnum>;
  isPublished: Scalars['Boolean'];
  shift: Shift;
};

export type DutyUpdateGqlInput = {
  /** New Users allocated to this shift for duty */
  newAllocations: Array<Scalars['String']>;
  /** Duties that are being reused (no change) */
  reusedDutyIds: Array<Scalars['String']>;
};

export type EditRequirementsForShiftsGqlInput = {
  requirements: ShiftRequirementInput;
  shiftId: Scalars['String'];
};

export type EditRosterRequirementGqlInput = {
  dates: Array<Scalars['DateTime']>;
  rosterTypeId: Scalars['String'];
  templates: TemplatesGqlInput;
};

export type Education = {
  __typename?: 'Education';
  degree: Scalars['String'];
  from: ExperienceDate;
  institution: Scalars['String'];
  to?: Maybe<ExperienceDate>;
};

export type EducationInputType = {
  degree: Scalars['String'];
  from: ExperienceDateInput;
  institution: Scalars['String'];
  to?: InputMaybe<ExperienceDateInput>;
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['ID'];
  hospital: Hospital;
  roles: Array<EmployeeRole>;
  user: User;
};

export type EmployeeDutyDuration = {
  __typename?: 'EmployeeDutyDuration';
  hours: Scalars['Float'];
  user: User;
};

export type EmployeeRequest = {
  __typename?: 'EmployeeRequest';
  _id: Scalars['ID'];
  email: Scalars['String'];
  hospital: Hospital;
  hospitalEmployeeId?: Maybe<Scalars['String']>;
  role: EmployeeRequestRole;
  status: RequestStatus;
  user?: Maybe<User>;
};

export type EmployeeRequestGqlInput = {
  email: Scalars['String'];
  hospitalEmployeeId?: InputMaybe<Scalars['String']>;
  hospitalId: Scalars['String'];
  role: EmployeeRoleInput;
  userId?: InputMaybe<Scalars['String']>;
};

export type EmployeeRequestRole = {
  __typename?: 'EmployeeRequestRole';
  _id: Scalars['ID'];
  department?: Maybe<Hospital>;
  employmentType: EmploymentType;
  hospitalRole: HospitalRole;
  permissions: Array<PermissionScope>;
};

export type EmployeeRole = {
  __typename?: 'EmployeeRole';
  _id: Scalars['String'];
  employmentType: EmploymentType;
  from?: Maybe<ExperienceDate>;
  hospitalRole: HospitalRole;
  permissions: Array<PermissionScope>;
  to?: Maybe<ExperienceDate>;
};

export type EmployeeRoleInput = {
  employmentTypeId: Scalars['String'];
  hospitalRoleId: Scalars['String'];
};

export type EmploymentType = {
  __typename?: 'EmploymentType';
  _id: Scalars['ID'];
  isDefault?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
};

export type EmploymentTypeInput = {
  /** is it default employment type */
  isDefault?: InputMaybe<Scalars['Boolean']>;
  /** Type of employment [FULL TIME, PART TIME, ...] */
  type: Scalars['String'];
};

export type Eula = {
  __typename?: 'Eula';
  _id: Scalars['ID'];
  content: Scalars['String'];
  expiryDate?: Maybe<Scalars['DateTime']>;
  hospital: HospitalAffiliation;
  licenseNumber: Scalars['String'];
  renewals: Array<Scalars['DateTime']>;
  validFor: Scalars['String'];
};

export type EulaInputType = {
  content?: InputMaybe<Scalars['String']>;
  validFor?: InputMaybe<Scalars['String']>;
};

export type ExperienceDate = {
  __typename?: 'ExperienceDate';
  month: Scalars['Int'];
  year: Scalars['Int'];
};

export type ExperienceDateInput = {
  month: Scalars['Int'];
  year: Scalars['Int'];
};

export type FailedCreateShiftsWithTemplate = {
  __typename?: 'FailedCreateShiftsWithTemplate';
  reason: Scalars['String'];
  wardId: Scalars['String'];
};

export type FilterOccupation = {
  /** Is the occupation related to hospital */
  isHospitalCategory: Scalars['Boolean'];
  isRxOccupation?: InputMaybe<Scalars['Boolean']>;
};

export enum FindEmployeeBy {
  Email = 'email',
  EmployeeRequestId = 'employeeRequestId',
}

export enum FindProfileBy {
  Id = '_id',
  UserId = 'userId',
}

export enum FindUserBy {
  Id = '_id',
  Email = 'email',
  PhoneNumber = 'phoneNumber',
}

export enum FindUserOnboardingBy {
  Email = 'email',
  Id = 'id',
  PhoneNumber = 'phoneNumber',
}

export type GetEmployeeDutyDurationInput = {
  from: Scalars['DateTime'];
  hospitalId: Scalars['String'];
  to: Scalars['DateTime'];
  userIds: Array<Scalars['String']>;
};

export type GetRosterGqlInput = {
  endDate: Scalars['DateTime'];
  rosterTypeIds?: InputMaybe<Array<Scalars['String']>>;
  startDate: Scalars['DateTime'];
  wardIds: Array<Scalars['String']>;
};

export type GetScheduleGqlInput = {
  from: Scalars['DateTime'];
  hospitalIds: Array<Scalars['String']>;
  to: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type Height = {
  __typename?: 'Height';
  unit: Scalars['String'];
  value: Scalars['Float'];
};

export type HeightInputType = {
  unit: Scalars['String'];
  value: Scalars['Float'];
};

export type Hospital = {
  __typename?: 'Hospital';
  _id: Scalars['ID'];
  address: Scalars['String'];
  departments: Array<Department>;
  name: Scalars['String'];
  wards: Array<Ward>;
};

export type HospitalAffiliation = {
  __typename?: 'HospitalAffiliation';
  _id: Scalars['ID'];
  address: Scalars['String'];
  eula?: Maybe<Eula>;
  hospitalAdmin?: Maybe<User>;
  name: Scalars['String'];
  pointOfContact?: Maybe<PointOfContact>;
};

export type HospitalInputType = {
  address: Scalars['String'];
  eula: EulaInputType;
  name: Scalars['String'];
  pointOfContact: PointOfContactInputType;
};

export type HospitalRole = {
  __typename?: 'HospitalRole';
  _id: Scalars['ID'];
  department?: Maybe<Department>;
  employees?: Maybe<Array<Employee>>;
  hospital: Hospital;
  hospitalRoleType: HospitalRoleType;
  sharedRole: Scalars['Boolean'];
};

export enum HospitalRoleCategory {
  Blucap = 'BLUCAP',
  Hybrid = 'HYBRID',
  Medical = 'MEDICAL',
  NonMedical = 'NON_MEDICAL',
}

export type HospitalRoleType = {
  __typename?: 'HospitalRoleType';
  _id: Scalars['ID'];
  abbr: Scalars['String'];
  category: HospitalRoleCategory;
  hospital: Hospital;
  permissions: Array<Permission>;
  title: Scalars['String'];
};

export type Language = {
  __typename?: 'Language';
  _id: Scalars['String'];
  isIndian?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  scid?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type LanguageInput = {
  isIndian?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  scid?: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};

export type LicenseDetails = {
  __typename?: 'LicenseDetails';
  number: Scalars['String'];
  validFrom?: Maybe<Scalars['DateTime']>;
  validTill?: Maybe<Scalars['DateTime']>;
};

export type LicenseDetailsInput = {
  number: Scalars['String'];
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validTill?: InputMaybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptEula: Eula;
  acceptRequest: EmployeeRequest;
  addLanguage: Language;
  allocateDutiesToShifts: Array<Shift>;
  cancelDuty: Shift;
  createAffiliatedWorkExperience: RxProfile;
  createDepartment: Array<Department>;
  createEmployeeRequests: Array<EmployeeRequest>;
  createEmploymentTypes: Array<EmploymentType>;
  createHospital: Hospital;
  createHospitalRoleType: HospitalRoleType;
  createHospitalRoles: Array<HospitalRole>;
  createManagedUser: UserOnboarding;
  createOccupation: Occupation;
  createProfile: Profile;
  createRoleType: RoleType;
  createRosterTypes: Array<RosterType>;
  createRxProfile: RxProfile;
  createShiftsWithTemplate: CreateShiftsWithTemplateGqlModel;
  createUnaffiliatedWorkExperience: RxProfile;
  createWard: Array<Ward>;
  createWardTypes: Array<WardType>;
  editRequirementsForShifts: Array<Shift>;
  editShiftTemplates: Array<Shift>;
  /** Requires bearer token in `Authorization` header */
  login: UserOnboarding;
  loginAgainstQrToken: UserOnboarding;
  onboardHospital: HospitalAffiliation;
  publishRoster: Array<Shift>;
  rejectEula: Eula;
  rejectRequest: EmployeeRequest;
  scan: Scalars['String'];
  sendOtpToEmail: Scalars['String'];
  setEmployeePermissions: Employee;
  setPermissionsForEmployeeRequest: EmployeeRequest;
  setPermissionsToHospitalRoleType: HospitalRoleType;
  setUnavailability: Unavailability;
  updateAffiliatedWorkExperience: RxProfile;
  updateEula: Eula;
  updateHospitalRoleTypeAttributes: HospitalRoleType;
  updateOnboardedUser: UserOnboarding;
  updateProfile: Profile;
  updateRxSkills: RxProfile;
  updateUser: User;
  verifyAffiliatedWorkExperienceRequest: AffiliatedWorkExperience;
  verifyOtp: Scalars['String'];
};

export type MutationAcceptEulaArgs = {
  eulaId: Scalars['String'];
};

export type MutationAcceptRequestArgs = {
  requestId: Scalars['String'];
};

export type MutationAddLanguageArgs = {
  language: LanguageInput;
};

export type MutationAllocateDutiesToShiftsArgs = {
  allocations: Array<AllocateDutiesToShiftGqlInput>;
};

export type MutationCancelDutyArgs = {
  cancelRoster: CancelDutyGqlInput;
};

export type MutationCreateAffiliatedWorkExperienceArgs = {
  rxProfileId: Scalars['String'];
  workExperience: AffiliatedWorkExperienceInput;
};

export type MutationCreateDepartmentArgs = {
  hospitalId: Scalars['String'];
  newDepartments: Array<NewDepartmentInput>;
};

export type MutationCreateEmployeeRequestsArgs = {
  employeeRequests: Array<EmployeeRequestGqlInput>;
};

export type MutationCreateEmploymentTypesArgs = {
  employmentTypes: Array<EmploymentTypeInput>;
};

export type MutationCreateHospitalArgs = {
  newHospital: CreateNewHospitalInput;
};

export type MutationCreateHospitalRoleTypeArgs = {
  newRole: NewHospitalRoleTypeInput;
};

export type MutationCreateHospitalRolesArgs = {
  hospitalId: Scalars['String'];
  newHospitalRoles: Array<NewHospitalRoleInput>;
};

export type MutationCreateManagedUserArgs = {
  user: CreateManagedUserInput;
};

export type MutationCreateOccupationArgs = {
  newOccupation: NewOccupationInput;
};

export type MutationCreateProfileArgs = {
  profile: ProfileInputType;
  userId: Scalars['String'];
};

export type MutationCreateRoleTypeArgs = {
  newRole: NewRoleTypeInput;
};

export type MutationCreateRosterTypesArgs = {
  rosterTypes: Array<Scalars['String']>;
};

export type MutationCreateRxProfileArgs = {
  rxProfile: NewRxProfileInput;
};

export type MutationCreateShiftsWithTemplateArgs = {
  rosterTemplate: RosterRequirementGqlInput;
  wardIds: Array<Scalars['String']>;
};

export type MutationCreateUnaffiliatedWorkExperienceArgs = {
  rxProfileId: Scalars['String'];
  workExperience: UnaffiliatedWorkExperienceInput;
};

export type MutationCreateWardArgs = {
  hospitalId: Scalars['String'];
  wards: Array<WardInput>;
};

export type MutationCreateWardTypesArgs = {
  wardTypes: Array<WardTypeInput>;
};

export type MutationEditRequirementsForShiftsArgs = {
  editRequirementsForShiftsInput: Array<EditRequirementsForShiftsGqlInput>;
};

export type MutationEditShiftTemplatesArgs = {
  rosterTemplate: EditRosterRequirementGqlInput;
  wardId: Scalars['String'];
};

export type MutationLoginAgainstQrTokenArgs = {
  token: Scalars['String'];
};

export type MutationOnboardHospitalArgs = {
  hospital: HospitalInputType;
};

export type MutationPublishRosterArgs = {
  shiftIds: Array<Scalars['String']>;
};

export type MutationRejectEulaArgs = {
  eulaId: Scalars['String'];
};

export type MutationRejectRequestArgs = {
  requestId: Scalars['String'];
};

export type MutationScanArgs = {
  scan: Scalars['String'];
};

export type MutationSendOtpToEmailArgs = {
  email: Scalars['String'];
};

export type MutationSetEmployeePermissionsArgs = {
  employeeId: Scalars['String'];
  employeeRoleId: Scalars['String'];
  permissions: Array<PermissionScopeInput>;
};

export type MutationSetPermissionsForEmployeeRequestArgs = {
  employeeRequestId: Scalars['String'];
  permissions: Array<PermissionScopeEmployeeVerificationInput>;
};

export type MutationSetPermissionsToHospitalRoleTypeArgs = {
  hospitalRoleTypeId: Scalars['String'];
  permissionIds: Array<Scalars['String']>;
};

export type MutationSetUnavailabilityArgs = {
  unavailabilityInput: UnavailabilityInput;
};

export type MutationUpdateAffiliatedWorkExperienceArgs = {
  role?: InputMaybe<UpdateAffiliatedRoleInput>;
  rxProfileId: Scalars['String'];
  workExperienceId: Scalars['String'];
};

export type MutationUpdateEulaArgs = {
  content?: InputMaybe<Scalars['String']>;
  eulaId: Scalars['String'];
  validFor?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateHospitalRoleTypeAttributesArgs = {
  hospitalAttributesInput: UpdateHospitalRoleTypeAttrsInput;
};

export type MutationUpdateOnboardedUserArgs = {
  user: UpdateUserInput;
};

export type MutationUpdateProfileArgs = {
  profile: ProfileInputType;
  userId: Scalars['String'];
};

export type MutationUpdateRxSkillsArgs = {
  procedureIds: Array<Scalars['String']>;
  rxProfileId: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  user: UserUpdateInput;
};

export type MutationVerifyAffiliatedWorkExperienceRequestArgs = {
  rxProfileId: Scalars['String'];
  workExperienceId: Scalars['String'];
};

export type MutationVerifyOtpArgs = {
  id: Scalars['String'];
  otp: Scalars['String'];
};

/** New Department */
export type NewDepartmentInput = {
  /** Abbreviation */
  abbr: Scalars['String'];
  /** Name */
  name: Scalars['String'];
};

/** Create New Role under Hospital */
export type NewHospitalRoleInput = {
  /** Id of department (optional) */
  departmentId?: InputMaybe<Scalars['String']>;
  /** Id of the role type */
  hospitalRoleTypeId: Scalars['String'];
  /** Is shared role? */
  sharedRole: Scalars['Boolean'];
};

export type NewHospitalRoleTypeInput = {
  /** Abbreviation of the hospital role type */
  abbr: Scalars['String'];
  /** Category of the hospital role type: Medical / Non-medical / Hybrid */
  category: HospitalRoleCategory;
  /** Hospital Id where new role type is being created */
  hospitalId: Scalars['String'];
  /** Title of the hospital role type */
  title: Scalars['String'];
};

export type NewOccupationInput = {
  /** Is the occupation related to hospital */
  isHospitalCategory: Scalars['Boolean'];
  /** Is the occupation related to rxUsers */
  isRxOccupation: Scalars['Boolean'];
  /** Name of occupation */
  name: Scalars['String'];
};

export type NewRoleTypeInput = {
  /** Abbreviation of the role type */
  abbr: Scalars['String'];
  /** Occupation under this role type */
  occupations: Array<Scalars['String']>;
  /** Title of the Role */
  title: Scalars['String'];
};

export type NewRxProfileInput = {
  license?: InputMaybe<LicenseDetailsInput>;
  userId: Scalars['String'];
};

export type Occupation = {
  __typename?: 'Occupation';
  _id: Scalars['ID'];
  isHospitalCategory: Scalars['Boolean'];
  isRxOccupation: Scalars['Boolean'];
  name: Scalars['String'];
  roleTypes: Array<RoleType>;
};

export type Permission = {
  __typename?: 'Permission';
  _id: Scalars['ID'];
  category: HospitalRoleCategory;
  conditionsSchema: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type PermissionScope = {
  __typename?: 'PermissionScope';
  conditions?: Maybe<Scalars['String']>;
  permissionId: Scalars['String'];
};

export type PermissionScopeEmployeeVerificationInput = {
  conditions?: InputMaybe<Scalars['String']>;
  permissionId: Scalars['String'];
};

export type PermissionScopeInput = {
  conditions?: InputMaybe<Scalars['String']>;
  permissionId: Scalars['String'];
};

export type PointOfContact = {
  __typename?: 'PointOfContact';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type PointOfContactInputType = {
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type Procedure = {
  __typename?: 'Procedure';
  _id: Scalars['ID'];
  isPreferredTerm: Scalars['Boolean'];
  name: Scalars['String'];
  procedureType?: Maybe<ProcedureType>;
  sctId?: Maybe<Scalars['String']>;
};

export type ProcedureRequirement = {
  __typename?: 'ProcedureRequirement';
  minimumAssignments: Scalars['Int'];
  procedure: Procedure;
};

export type ProcedureRequirementInput = {
  minimumAssignments: Scalars['Float'];
  procedureId: Scalars['String'];
};

export type ProcedureType = {
  __typename?: 'ProcedureType';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  _id: Scalars['String'];
  educations: Array<Education>;
  height?: Maybe<Height>;
  languages: Array<Language>;
  user: User;
  weight?: Maybe<Weight>;
};

export type ProfileInputType = {
  educations?: InputMaybe<Array<EducationInputType>>;
  height?: InputMaybe<HeightInputType>;
  languageIds?: InputMaybe<Array<Scalars['String']>>;
  weight?: InputMaybe<WeightInputType>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<UserOnboarding>;
  findEmployeeRequest: Array<EmployeeRequest>;
  findEmployeeRequestUnderHospital: Array<EmployeeRequest>;
  findEmployeeRequestUnderHospitalRoles: Array<EmployeeRequest>;
  findHospital: HospitalAffiliation;
  findLanguage?: Maybe<Language>;
  findManyUsersById: Array<User>;
  findOnboardedUser: UserOnboarding;
  findProfile?: Maybe<Profile>;
  findUser: User;
  getAllLanguages: Array<Language>;
  getAllPermissions: Array<Permission>;
  getAllProcedures: Array<Procedure>;
  getDepartmentById: Department;
  getDutyDurationForEmployees: Array<EmployeeDutyDuration>;
  getEmployeeById: Employee;
  getEmployeeProfilesForUsersInHospital: Array<Employee>;
  getEmployeeProfilesUnderUser: Array<Employee>;
  getEmployeesByHospitalId: Array<Employee>;
  getEmployeesByHospitalRoleTypeId: Array<Employee>;
  getEmployeesForShift: Array<Employee>;
  getEmploymentTypeById: EmploymentType;
  getEmploymentTypes: Array<EmploymentType>;
  getHospitalById: Hospital;
  getHospitalRoleById: HospitalRole;
  getHospitalRoleTypes: Array<HospitalRoleType>;
  getHospitalRolesByHospitalId: Array<HospitalRole>;
  getOccupations: Array<Occupation>;
  getQrCodeForLogin: Scalars['String'];
  getRoles: Array<RoleType>;
  getRoster: Array<Shift>;
  getRosterTypes: Array<RosterType>;
  getRxProfileById: RxProfile;
  getSchedule: Schedule;
  getWardById: Ward;
  getWardTypes: Array<WardType>;
};

export type QueryFindEmployeeRequestArgs = {
  by?: InputMaybe<FindEmployeeBy>;
  value: Scalars['String'];
};

export type QueryFindEmployeeRequestUnderHospitalArgs = {
  hospitalId: Scalars['String'];
};

export type QueryFindEmployeeRequestUnderHospitalRolesArgs = {
  hospitalRoleIds: Array<Scalars['String']>;
};

export type QueryFindHospitalArgs = {
  id: Scalars['String'];
};

export type QueryFindLanguageArgs = {
  id: Scalars['String'];
};

export type QueryFindManyUsersByIdArgs = {
  ids: Array<Scalars['String']>;
};

export type QueryFindOnboardedUserArgs = {
  by: FindUserOnboardingBy;
  value: Scalars['String'];
};

export type QueryFindProfileArgs = {
  by?: InputMaybe<FindProfileBy>;
  value: Scalars['String'];
};

export type QueryFindUserArgs = {
  by?: InputMaybe<FindUserBy>;
  value: Scalars['String'];
};

export type QueryGetDepartmentByIdArgs = {
  departmentId: Scalars['String'];
};

export type QueryGetDutyDurationForEmployeesArgs = {
  dutyDurationInput: GetEmployeeDutyDurationInput;
};

export type QueryGetEmployeeByIdArgs = {
  employeeId: Scalars['String'];
};

export type QueryGetEmployeeProfilesForUsersInHospitalArgs = {
  hospitalId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type QueryGetEmployeeProfilesUnderUserArgs = {
  userId: Scalars['String'];
};

export type QueryGetEmployeesByHospitalIdArgs = {
  hospitalId: Scalars['String'];
};

export type QueryGetEmployeesByHospitalRoleTypeIdArgs = {
  hospitalRoleTypeId: Scalars['String'];
};

export type QueryGetEmployeesForShiftArgs = {
  shiftDetails: ShiftDetailsInput;
};

export type QueryGetEmploymentTypeByIdArgs = {
  employeeTypeId: Scalars['String'];
};

export type QueryGetHospitalByIdArgs = {
  hospitalId: Scalars['String'];
};

export type QueryGetHospitalRoleByIdArgs = {
  hospitalRoleId: Scalars['String'];
};

export type QueryGetHospitalRoleTypesArgs = {
  hospitalId: Scalars['String'];
};

export type QueryGetHospitalRolesByHospitalIdArgs = {
  hospitalId: Scalars['String'];
};

export type QueryGetOccupationsArgs = {
  filters: FilterOccupation;
};

export type QueryGetRosterArgs = {
  roster: GetRosterGqlInput;
};

export type QueryGetRxProfileByIdArgs = {
  rxProfileId: Scalars['String'];
};

export type QueryGetScheduleArgs = {
  schedule: GetScheduleGqlInput;
};

export type QueryGetWardByIdArgs = {
  wardId: Scalars['String'];
};

export enum RequestStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type RoleRequirement = {
  __typename?: 'RoleRequirement';
  hospitalRoleType: HospitalRole;
  minimumAssignments: Scalars['Int'];
};

export type RoleRequirementInput = {
  hospitalRoleTypeId: Scalars['String'];
  minimumAssignments: Scalars['Int'];
};

export type RoleType = {
  __typename?: 'RoleType';
  _id: Scalars['ID'];
  abbr: Scalars['String'];
  occupations: Array<Occupation>;
  title: Scalars['String'];
};

export type RosterRequirementGqlInput = {
  from: Scalars['DateTime'];
  rosterTypeId: Scalars['String'];
  templates: TemplatesGqlInput;
  to: Scalars['DateTime'];
};

export type RosterType = {
  __typename?: 'RosterType';
  _id: Scalars['ID'];
  typeName: Scalars['String'];
};

export type RxProfile = {
  __typename?: 'RxProfile';
  _id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  license?: Maybe<LicenseDetails>;
  skill?: Maybe<RxSkill>;
  user: User;
  workExperience: WorkExperience;
};

export type RxRoleInputUnaffiliated = {
  /** Department */
  department?: InputMaybe<Scalars['String']>;
  /** Employment Type Intern */
  employmentType: Scalars['String'];
  /** Employed from */
  from: ExperienceDateInput;
  /** Role Title */
  title: Scalars['String'];
  /** Employed Till */
  to?: InputMaybe<ExperienceDateInput>;
};

export type RxSkill = {
  __typename?: 'RxSkill';
  canPerformProcedures: Array<Procedure>;
};

export type Schedule = {
  __typename?: 'Schedule';
  duties: Array<Duty>;
  unavailabilities: Array<Unavailability>;
};

export type Shift = {
  __typename?: 'Shift';
  _id: Scalars['ID'];
  cancelledDuties: Array<Duty>;
  draftDutyChanges?: Maybe<DraftDutyChanges>;
  duties: Array<Duty>;
  rosterType: RosterType;
  shiftTemplate: ShiftTemplate;
  startDate: Scalars['DateTime'];
  ward: Ward;
};

export type ShiftDetailsInput = {
  /** List of shift IDs */
  shiftIds: Array<Scalars['String']>;
};

export type ShiftRequirement = {
  __typename?: 'ShiftRequirement';
  minimumStrength: Scalars['Int'];
  requiredProcedures?: Maybe<Array<ProcedureRequirement>>;
  requiredRoles?: Maybe<Array<RoleRequirement>>;
};

export type ShiftRequirementInput = {
  minimumStrength: Scalars['Int'];
  requiredProcedures?: InputMaybe<Array<ProcedureRequirementInput>>;
  requiredRoles?: InputMaybe<Array<RoleRequirementInput>>;
};

export type ShiftTemplate = {
  __typename?: 'ShiftTemplate';
  _id: Scalars['ID'];
  duration: ShiftTemplateDuration;
  name: Scalars['String'];
  requirements: ShiftRequirement;
  rosterType: RosterType;
  startTime: Time24HourFormat;
  ward: Ward;
};

export type ShiftTemplateDuration = {
  __typename?: 'ShiftTemplateDuration';
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type ShiftTemplateDurationGqlInput = {
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type ShiftTemplateGqlInput = {
  duration: ShiftTemplateDurationGqlInput;
  name: Scalars['String'];
  requirements: ShiftRequirementInput;
  shiftTemplateId: Scalars['String'];
  startTime: Time24HourFormatGqlInput;
};

export type SubscriptionDataQrLogin = {
  __typename?: 'SubscriptionDataQrLogin';
  clientId: Scalars['String'];
  eventType: SubscriptionDataQrLoginEventType;
  payload: Scalars['String'];
};

export enum SubscriptionDataQrLoginEventType {
  Initialize = 'initialize',
  Login = 'login',
}

export type SuccessCreateShiftsWithTemplate = {
  __typename?: 'SuccessCreateShiftsWithTemplate';
  shifts: Array<Shift>;
  ward: Ward;
};

export type TemplatesGqlInput = {
  dailyTemplates: Array<DailyTemplatesGqlInput>;
  newTemplates: Array<ShiftTemplateGqlInput>;
};

export type Time24HourFormat = {
  __typename?: 'Time24HourFormat';
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type Time24HourFormatGqlInput = {
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type UnaffiliatedRole = {
  __typename?: 'UnaffiliatedRole';
  department?: Maybe<Scalars['String']>;
  employmentType: Scalars['String'];
  from: ExperienceDate;
  title: Scalars['String'];
  to?: Maybe<ExperienceDate>;
};

export type UnaffiliatedWorkExperience = {
  __typename?: 'UnaffiliatedWorkExperience';
  _id: Scalars['ID'];
  hospital: Scalars['String'];
  role: UnaffiliatedRole;
};

export type UnaffiliatedWorkExperienceInput = {
  /** Id Of the organisation */
  hospital: Scalars['String'];
  role: RxRoleInputUnaffiliated;
};

export type Unavailability = {
  __typename?: 'Unavailability';
  _id: Scalars['String'];
  from: Scalars['DateTime'];
  hospitalId: Scalars['String'];
  to: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type UnavailabilityInput = {
  from: Scalars['DateTime'];
  hospitalId: Scalars['String'];
  to: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type UpdateAffiliatedRoleInput = {
  /** Employed from */
  department?: InputMaybe<Scalars['String']>;
  /** Employed from */
  from?: InputMaybe<ExperienceDateInput>;
  /** Role Title */
  title?: InputMaybe<Scalars['String']>;
  /** Employed Till */
  to?: InputMaybe<ExperienceDateInput>;
};

export type UpdateHospitalRoleTypeAttrsInput = {
  /** ID of hospital role type that is being updated */
  _id: Scalars['String'];
  /** Abbreviation of the hospital role type */
  abbr: Scalars['String'];
  /** Category of the hospital role type: Medical / Non-medical / Hybrid */
  category: HospitalRoleCategory;
  /** Title of the hospital role type */
  title: Scalars['String'];
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  dateOfBirth: Scalars['DateTime'];
  fullName: Scalars['String'];
  gender: UserOnboardingGender;
  picture?: InputMaybe<Scalars['String']>;
  referral?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  address?: Maybe<Scalars['String']>;
  dateOfBirth: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  managedByHospitalIds: Array<Hospital>;
  managedByUserIds: Array<User>;
  managingUserIds: Array<User>;
  phoneNumber: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  profile: Profile;
  rxProfile?: Maybe<RxProfile>;
};

export type UserOnboarding = {
  __typename?: 'UserOnboarding';
  _id: Scalars['ID'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<UserOnboardingGender>;
  phoneNumber?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  referral?: Maybe<Scalars['String']>;
};

export enum UserOnboardingGender {
  Female = 'female',
  Male = 'male',
  Others = 'others',
}

export type UserUpdateInput = {
  address?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

export enum VerificationStatusEnum {
  Approved = 'APPROVED',
  NotApplicable = 'NOT_APPLICABLE',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type Ward = {
  __typename?: 'Ward';
  _id: Scalars['ID'];
  abbr: Scalars['String'];
  beds: Array<WardBed>;
  department?: Maybe<Department>;
  hospital: Hospital;
  name: Scalars['String'];
  wardType: WardType;
};

export type WardBed = {
  __typename?: 'WardBed';
  number: Scalars['String'];
  type: Scalars['String'];
};

export type WardBedInput = {
  number: Scalars['String'];
  type: Scalars['String'];
};

export type WardInput = {
  abbr: Scalars['String'];
  beds: Array<WardBedInput>;
  departmentId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  wardTypeId: Scalars['String'];
};

export type WardType = {
  __typename?: 'WardType';
  _id: Scalars['ID'];
  color: Scalars['String'];
  name: Scalars['String'];
};

export type WardTypeInput = {
  /** Color of Ward (HexCode) */
  color: Scalars['String'];
  /** Name */
  name: Scalars['String'];
};

export type Weight = {
  __typename?: 'Weight';
  unit: Scalars['String'];
  value: Scalars['Float'];
};

export type WeightInputType = {
  unit: Scalars['String'];
  value: Scalars['Float'];
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  affiliated?: Maybe<Array<AffiliatedWorkExperience>>;
  unaffiliated?: Maybe<Array<UnaffiliatedWorkExperience>>;
};

export type CreateWardsMutationVariables = Exact<{
  id: Scalars['String'];
  wards: Array<WardInput> | WardInput;
}>;

export type CreateWardsMutation = {
  __typename?: 'Mutation';
  createWard: Array<{ __typename: 'Ward' }>;
};

export type CreateRoleTypeForHospitalMutationVariables = Exact<{
  role: NewHospitalRoleTypeInput;
}>;

export type CreateRoleTypeForHospitalMutation = {
  __typename?: 'Mutation';
  createHospitalRoleType: {
    __typename?: 'HospitalRoleType';
    _id: string;
    abbr: string;
    title: string;
  };
};

export type GrantPermissionMutationVariables = Exact<{
  hospitalRoleTypeId: Scalars['String'];
  permissionIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type GrantPermissionMutation = {
  __typename?: 'Mutation';
  setPermissionsToHospitalRoleType: {
    __typename?: 'HospitalRoleType';
    _id: string;
    title: string;
    permissions: Array<{ __typename?: 'Permission'; _id: string }>;
  };
};

export type CreateDepartmentMutationVariables = Exact<{
  hospitalId: Scalars['String'];
  departments: Array<NewDepartmentInput> | NewDepartmentInput;
}>;

export type CreateDepartmentMutation = {
  __typename?: 'Mutation';
  createDepartment: Array<{ __typename?: 'Department'; _id: string }>;
};

export type SendEmployeeRequestMutationVariables = Exact<{
  employee: Array<EmployeeRequestGqlInput> | EmployeeRequestGqlInput;
}>;

export type SendEmployeeRequestMutation = {
  __typename?: 'Mutation';
  createEmployeeRequests: Array<{
    __typename?: 'EmployeeRequest';
    _id: string;
  }>;
};

export type CreateHospitalRolesMutationVariables = Exact<{
  hospitalId: Scalars['String'];
  hospitalRoles: Array<NewHospitalRoleInput> | NewHospitalRoleInput;
}>;

export type CreateHospitalRolesMutation = {
  __typename?: 'Mutation';
  createHospitalRoles: Array<{ __typename?: 'HospitalRole'; _id: string }>;
};

export type CreateRosterMutationVariables = Exact<{
  wardIds: Array<Scalars['String']> | Scalars['String'];
  rosterTemplate: RosterRequirementGqlInput;
}>;

export type CreateRosterMutation = {
  __typename?: 'Mutation';
  createShiftsWithTemplate: {
    __typename?: 'CreateShiftsWithTemplateGqlModel';
    success: Array<{
      __typename?: 'SuccessCreateShiftsWithTemplate';
      ward: {
        __typename?: 'Ward';
        _id: string;
        department?: { __typename?: 'Department'; _id: string } | null;
      };
      shifts: Array<{
        __typename?: 'Shift';
        _id: string;
        shiftTemplate: {
          __typename?: 'ShiftTemplate';
          _id: string;
          name: string;
          rosterType: {
            __typename?: 'RosterType';
            _id: string;
            typeName: string;
          };
          ward: {
            __typename?: 'Ward';
            _id: string;
            department?: { __typename?: 'Department'; _id: string } | null;
          };
          startTime: {
            __typename?: 'Time24HourFormat';
            hour: number;
            minute: number;
          };
          duration: {
            __typename?: 'ShiftTemplateDuration';
            hour: number;
            minute: number;
          };
          requirements: {
            __typename?: 'ShiftRequirement';
            minimumStrength: number;
          };
        };
        draftDutyChanges?: {
          __typename?: 'DraftDutyChanges';
          newAllocations?: Array<{
            __typename?: 'User';
            _id: string;
            email?: string | null;
            address?: string | null;
            picture?: string | null;
          }> | null;
          reusedDuties?: Array<{
            __typename?: 'Duty';
            _id: string;
            cancelledBy?: CancelledByGqlEnum | null;
            isPublished: boolean;
            allocation: {
              __typename?: 'User';
              _id: string;
              email?: string | null;
              address?: string | null;
              picture?: string | null;
            };
          }> | null;
        } | null;
      }>;
    }>;
    failed: Array<{
      __typename?: 'FailedCreateShiftsWithTemplate';
      wardId: string;
      reason: string;
    }>;
  };
};

export type AllocationDutiesShiftMutationVariables = Exact<{
  allocationDuties:
    | Array<AllocateDutiesToShiftGqlInput>
    | AllocateDutiesToShiftGqlInput;
}>;

export type AllocationDutiesShiftMutation = {
  __typename?: 'Mutation';
  allocateDutiesToShifts: Array<{ __typename?: 'Shift'; _id: string }>;
};

export type GetPublishRosterMutationVariables = Exact<{
  shiftIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type GetPublishRosterMutation = {
  __typename?: 'Mutation';
  publishRoster: Array<{
    __typename?: 'Shift';
    _id: string;
    startDate: string;
    shiftTemplate: {
      __typename?: 'ShiftTemplate';
      _id: string;
      name: string;
      rosterType: { __typename?: 'RosterType'; _id: string; typeName: string };
      ward: {
        __typename?: 'Ward';
        _id: string;
        department?: { __typename?: 'Department'; _id: string } | null;
      };
      startTime: {
        __typename?: 'Time24HourFormat';
        hour: number;
        minute: number;
      };
      duration: {
        __typename?: 'ShiftTemplateDuration';
        hour: number;
        minute: number;
      };
      requirements: {
        __typename?: 'ShiftRequirement';
        minimumStrength: number;
      };
    };
    ward: { __typename?: 'Ward'; _id: string };
    rosterType: { __typename?: 'RosterType'; _id: string; typeName: string };
    duties: Array<{
      __typename?: 'Duty';
      _id: string;
      cancelledBy?: CancelledByGqlEnum | null;
      isPublished: boolean;
      allocation: {
        __typename?: 'User';
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
      };
    }>;
    draftDutyChanges?: {
      __typename?: 'DraftDutyChanges';
      newAllocations?: Array<{
        __typename?: 'User';
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
      }> | null;
      reusedDuties?: Array<{
        __typename?: 'Duty';
        _id: string;
        cancelledBy?: CancelledByGqlEnum | null;
        isPublished: boolean;
        allocation: {
          __typename?: 'User';
          _id: string;
          email?: string | null;
          address?: string | null;
          picture?: string | null;
        };
      }> | null;
    } | null;
    cancelledDuties: Array<{
      __typename?: 'Duty';
      _id: string;
      cancelledBy?: CancelledByGqlEnum | null;
    }>;
  }>;
};

export type GetEditRequirementsForShiftsMutationVariables = Exact<{
  editRequirementsForShiftsInput:
    | Array<EditRequirementsForShiftsGqlInput>
    | EditRequirementsForShiftsGqlInput;
}>;

export type GetEditRequirementsForShiftsMutation = {
  __typename?: 'Mutation';
  editRequirementsForShifts: Array<{
    __typename?: 'Shift';
    _id: string;
    draftDutyChanges?: {
      __typename?: 'DraftDutyChanges';
      newAllocations?: Array<{
        __typename?: 'User';
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
      }> | null;
      reusedDuties?: Array<{
        __typename?: 'Duty';
        _id: string;
        cancelledBy?: CancelledByGqlEnum | null;
        isPublished: boolean;
        allocation: {
          __typename?: 'User';
          _id: string;
          email?: string | null;
          address?: string | null;
          picture?: string | null;
        };
      }> | null;
    } | null;
  }>;
};

export type GetHospitalByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetHospitalByIdQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    _id: string;
    address: string;
    name: string;
  };
};

export type GetWardsForHospitalQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetWardsForHospitalQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    wards: Array<{
      __typename?: 'Ward';
      _id: string;
      abbr: string;
      name: string;
      wardType: {
        __typename?: 'WardType';
        _id: string;
        color: string;
        name: string;
      };
      beds: Array<{ __typename?: 'WardBed'; number: string; type: string }>;
      department?: {
        __typename?: 'Department';
        _id: string;
        abbr: string;
        name: string;
      } | null;
    }>;
  };
};

export type GetDepartmentForHospitalQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetDepartmentForHospitalQuery = {
  __typename?: 'Query';
  departments: {
    __typename?: 'Hospital';
    departments: Array<{
      __typename?: 'Department';
      _id: string;
      abbr: string;
      name: string;
    }>;
  };
};

export type GetWardTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetWardTypesQuery = {
  __typename?: 'Query';
  wardType: Array<{
    __typename?: 'WardType';
    _id: string;
    color: string;
    name: string;
  }>;
};

export type GetEmployeesForHospitalQueryVariables = Exact<{
  hospitalId: Scalars['String'];
}>;

export type GetEmployeesForHospitalQuery = {
  __typename?: 'Query';
  employees: Array<{
    __typename?: 'Employee';
    _id: string;
    roles: Array<{
      __typename?: 'EmployeeRole';
      _id: string;
      employmentType: { __typename?: 'EmploymentType'; _id: string };
      from?: {
        __typename?: 'ExperienceDate';
        month: number;
        year: number;
      } | null;
      hospitalRole: {
        __typename?: 'HospitalRole';
        hospitalRoleType: {
          __typename?: 'HospitalRoleType';
          _id: string;
          abbr: string;
          title: string;
        };
        department?: {
          __typename?: 'Department';
          name: string;
          _id: string;
        } | null;
      };
    }>;
    user: {
      __typename?: 'User';
      _id: string;
      fullName: string;
      email?: string | null;
      phoneNumber: string;
      picture?: string | null;
      profile: {
        __typename?: 'Profile';
        educations: Array<{ __typename?: 'Education'; degree: string }>;
      };
    };
  }>;
  departments: {
    __typename?: 'Hospital';
    departments: Array<{
      __typename?: 'Department';
      name: string;
      abbr: string;
      _id: string;
    }>;
  };
};

export type GetHospitalRoleTypesQueryVariables = Exact<{
  hospitalId: Scalars['String'];
}>;

export type GetHospitalRoleTypesQuery = {
  __typename?: 'Query';
  roleTypes: Array<{
    __typename?: 'HospitalRoleType';
    _id: string;
    abbr: string;
    category: HospitalRoleCategory;
    title: string;
    permissions: Array<{
      __typename?: 'Permission';
      _id: string;
      category: HospitalRoleCategory;
      description?: string | null;
      name: string;
    }>;
  }>;
};

export type GetAllPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPermissionsQuery = {
  __typename?: 'Query';
  permissions: Array<{
    __typename?: 'Permission';
    _id: string;
    category: HospitalRoleCategory;
    description?: string | null;
    name: string;
  }>;
};

export type GetHospitalRoleQueryVariables = Exact<{
  hospitalId: Scalars['String'];
}>;

export type GetHospitalRoleQuery = {
  __typename?: 'Query';
  hospitalRoles: Array<{
    __typename?: 'HospitalRole';
    _id: string;
    hospitalRoleType: {
      __typename?: 'HospitalRoleType';
      _id: string;
      title: string;
    };
  }>;
};

export type GetRosterTemplateRequirementDataQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetRosterTemplateRequirementDataQuery = {
  __typename?: 'Query';
  roles: Array<{ __typename?: 'RoleType'; _id: string; title: string }>;
};

export type GetRosterQueryVariables = Exact<{
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  wardIds: Array<Scalars['String']> | Scalars['String'];
  rosterTypeIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetRosterQuery = {
  __typename?: 'Query';
  roster: Array<{
    __typename?: 'Shift';
    _id: string;
    startDate: string;
    duties: Array<{
      __typename?: 'Duty';
      _id: string;
      cancelledBy?: CancelledByGqlEnum | null;
      isPublished: boolean;
      allocation: {
        __typename?: 'User';
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
        fullName: string;
      };
    }>;
    cancelledDuties: Array<{
      __typename?: 'Duty';
      _id: string;
      allocation: {
        __typename?: 'User';
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
        fullName: string;
        profile: {
          __typename?: 'Profile';
          educations: Array<{ __typename?: 'Education'; degree: string }>;
        };
        rxProfile?: {
          __typename?: 'RxProfile';
          _id: string;
          skill?: {
            __typename?: 'RxSkill';
            canPerformProcedures: Array<{
              __typename?: 'Procedure';
              _id: string;
              sctId?: string | null;
              name: string;
              isPreferredTerm: boolean;
              procedureType?: {
                __typename?: 'ProcedureType';
                _id: string;
                name: string;
              } | null;
            }>;
          } | null;
        } | null;
      };
    }>;
    shiftTemplate: {
      __typename?: 'ShiftTemplate';
      _id: string;
      name: string;
      startTime: {
        __typename?: 'Time24HourFormat';
        hour: number;
        minute: number;
      };
      duration: {
        __typename?: 'ShiftTemplateDuration';
        hour: number;
        minute: number;
      };
      requirements: {
        __typename?: 'ShiftRequirement';
        minimumStrength: number;
        requiredProcedures?: Array<{
          __typename?: 'ProcedureRequirement';
          procedure: { __typename?: 'Procedure'; _id: string; name: string };
        }> | null;
        requiredRoles?: Array<{
          __typename?: 'RoleRequirement';
          minimumAssignments: number;
          hospitalRoleType: {
            __typename?: 'HospitalRole';
            _id: string;
            hospitalRoleType: {
              __typename?: 'HospitalRoleType';
              title: string;
            };
          };
        }> | null;
      };
    };
    draftDutyChanges?: {
      __typename?: 'DraftDutyChanges';
      newAllocations?: Array<{
        __typename?: 'User';
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
        fullName: string;
      }> | null;
      reusedDuties?: Array<{
        __typename?: 'Duty';
        _id: string;
        cancelledBy?: CancelledByGqlEnum | null;
        isPublished: boolean;
        allocation: {
          __typename?: 'User';
          _id: string;
          email?: string | null;
          address?: string | null;
          picture?: string | null;
          fullName: string;
        };
      }> | null;
    } | null;
  }>;
};

export type GetRosterTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRosterTypesQuery = {
  __typename?: 'Query';
  rosterTypes: Array<{
    __typename?: 'RosterType';
    _id: string;
    typeName: string;
  }>;
};

export type GetEmployeesListByHispitalIdQueryVariables = Exact<{
  hospitalId: Scalars['String'];
}>;

export type GetEmployeesListByHispitalIdQuery = {
  __typename?: 'Query';
  employees: Array<{
    __typename?: 'Employee';
    _id: string;
    roles: Array<{
      __typename?: 'EmployeeRole';
      _id: string;
      from?: {
        __typename?: 'ExperienceDate';
        month: number;
        year: number;
      } | null;
      hospitalRole: {
        __typename?: 'HospitalRole';
        hospitalRoleType: {
          __typename?: 'HospitalRoleType';
          _id: string;
          abbr: string;
          title: string;
        };
        department?: {
          __typename?: 'Department';
          name: string;
          _id: string;
        } | null;
      };
    }>;
    user: {
      __typename?: 'User';
      _id: string;
      email?: string | null;
      fullName: string;
      address?: string | null;
      picture?: string | null;
      rxProfile?: {
        __typename?: 'RxProfile';
        _id: string;
        skill?: {
          __typename?: 'RxSkill';
          canPerformProcedures: Array<{
            __typename?: 'Procedure';
            _id: string;
            sctId?: string | null;
            name: string;
            isPreferredTerm: boolean;
            procedureType?: {
              __typename?: 'ProcedureType';
              _id: string;
              name: string;
            } | null;
          }>;
        } | null;
      } | null;
    };
  }>;
};

export type GetEmployeesForShiftQueryVariables = Exact<{
  shiftDetails: ShiftDetailsInput;
}>;

export type GetEmployeesForShiftQuery = {
  __typename?: 'Query';
  employees: Array<{
    __typename?: 'Employee';
    _id: string;
    roles: Array<{
      __typename?: 'EmployeeRole';
      _id: string;
      employmentType: { __typename?: 'EmploymentType'; _id: string };
      from?: {
        __typename?: 'ExperienceDate';
        month: number;
        year: number;
      } | null;
      hospitalRole: {
        __typename?: 'HospitalRole';
        hospitalRoleType: {
          __typename?: 'HospitalRoleType';
          _id: string;
          abbr: string;
          title: string;
        };
        department?: {
          __typename?: 'Department';
          name: string;
          _id: string;
        } | null;
      };
    }>;
    user: {
      __typename?: 'User';
      _id: string;
      email?: string | null;
      fullName: string;
      address?: string | null;
      picture?: string | null;
      rxProfile?: {
        __typename?: 'RxProfile';
        _id: string;
        skill?: {
          __typename?: 'RxSkill';
          canPerformProcedures: Array<{
            __typename?: 'Procedure';
            _id: string;
            sctId?: string | null;
            name: string;
            isPreferredTerm: boolean;
            procedureType?: {
              __typename?: 'ProcedureType';
              _id: string;
              name: string;
            } | null;
          }>;
        } | null;
      } | null;
      profile: {
        __typename?: 'Profile';
        educations: Array<{ __typename?: 'Education'; degree: string }>;
      };
    };
  }>;
};

export type LoginAgainstQrTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type LoginAgainstQrTokenMutation = {
  __typename?: 'Mutation';
  loginAgainstQrToken: {
    __typename?: 'UserOnboarding';
    _id: string;
    dateOfBirth?: string | null;
    email?: string | null;
    fullName?: string | null;
    phoneNumber?: string | null;
    picture?: string | null;
  };
};

export type LoginMutationVariables = Exact<{ [key: string]: never }>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'UserOnboarding'; _id: string };
};

export type GenerateQrCodeQueryVariables = Exact<{ [key: string]: never }>;

export type GenerateQrCodeQuery = {
  __typename?: 'Query';
  getQrCodeForLogin: string;
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'UserOnboarding';
    _id: string;
    phoneNumber?: string | null;
    picture?: string | null;
    email?: string | null;
    dateOfBirth?: string | null;
    fullName?: string | null;
  } | null;
};

export type UpdateLanguageMutationVariables = Exact<{
  userId: Scalars['String'];
  languages: Array<Scalars['String']> | Scalars['String'];
}>;

export type UpdateLanguageMutation = {
  __typename?: 'Mutation';
  updateProfile: {
    __typename?: 'Profile';
    _id: string;
    languages: Array<{ __typename?: 'Language'; _id: string; value: string }>;
  };
};

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type GetUserProfileQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    _id: string;
    phoneNumber: string;
    picture?: string | null;
    email?: string | null;
    fullName: string;
    profile: {
      __typename?: 'Profile';
      _id: string;
      educations: Array<{
        __typename?: 'Education';
        degree: string;
        institution: string;
        from: { __typename?: 'ExperienceDate'; month: number; year: number };
        to?: {
          __typename?: 'ExperienceDate';
          month: number;
          year: number;
        } | null;
      }>;
      height?: { __typename?: 'Height'; unit: string; value: number } | null;
      weight?: { __typename?: 'Weight'; unit: string; value: number } | null;
      languages: Array<{
        __typename?: 'Language';
        _id: string;
        isIndian?: boolean | null;
        label: string;
        scid?: string | null;
        value: string;
      }>;
    };
    rxProfile?: {
      __typename?: 'RxProfile';
      _id: string;
      isVerified: boolean;
      license?: {
        __typename?: 'LicenseDetails';
        number: string;
        validFrom?: string | null;
        validTill?: string | null;
      } | null;
      skill?: {
        __typename?: 'RxSkill';
        canPerformProcedures: Array<{
          __typename?: 'Procedure';
          _id: string;
          sctId?: string | null;
          name: string;
          isPreferredTerm: boolean;
          procedureType?: {
            __typename?: 'ProcedureType';
            _id: string;
            name: string;
          } | null;
        }>;
      } | null;
      workExperience: {
        __typename?: 'WorkExperience';
        affiliated?: Array<{
          __typename?: 'AffiliatedWorkExperience';
          _id: string;
          verificationStatus: VerificationStatusEnum;
          hospital: { __typename?: 'Hospital'; name: string; _id: string };
          role: {
            __typename?: 'AffiliatedRole';
            department?: string | null;
            title: string;
            employmentType: { __typename?: 'EmploymentType'; type: string };
            from?: {
              __typename?: 'ExperienceDate';
              month: number;
              year: number;
            } | null;
            to?: {
              __typename?: 'ExperienceDate';
              month: number;
              year: number;
            } | null;
          };
        }> | null;
        unaffiliated?: Array<{
          __typename?: 'UnaffiliatedWorkExperience';
          _id: string;
          hospital: string;
          role: {
            __typename?: 'UnaffiliatedRole';
            department?: string | null;
            employmentType: string;
            title: string;
            from: {
              __typename?: 'ExperienceDate';
              month: number;
              year: number;
            };
            to?: {
              __typename?: 'ExperienceDate';
              month: number;
              year: number;
            } | null;
          };
        }> | null;
      };
    } | null;
  };
};

export type GetAllLanguagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllLanguagesQuery = {
  __typename?: 'Query';
  languages: Array<{
    __typename?: 'Language';
    _id: string;
    isIndian?: boolean | null;
    label: string;
    value: string;
  }>;
};

export type GetScheduleQueryVariables = Exact<{
  schedule: GetScheduleGqlInput;
}>;

export type GetScheduleQuery = {
  __typename?: 'Query';
  getSchedule: {
    __typename?: 'Schedule';
    duties: Array<{
      __typename?: 'Duty';
      _id: string;
      shift: {
        __typename?: 'Shift';
        _id: string;
        startDate: string;
        ward: { __typename?: 'Ward'; _id: string; name: string };
        shiftTemplate: {
          __typename?: 'ShiftTemplate';
          _id: string;
          duration: {
            __typename?: 'ShiftTemplateDuration';
            hour: number;
            minute: number;
          };
        };
        cancelledDuties: Array<{ __typename?: 'Duty'; _id: string }>;
        rosterType: {
          __typename?: 'RosterType';
          _id: string;
          typeName: string;
        };
      };
    }>;
    unavailabilities: Array<{
      __typename?: 'Unavailability';
      _id: string;
      userId: string;
      hospitalId: string;
      from: string;
      to: string;
    }>;
  };
};

export type GetAllProceduresQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProceduresQuery = {
  __typename?: 'Query';
  getAllProcedures: Array<{
    __typename?: 'Procedure';
    _id: string;
    isPreferredTerm: boolean;
    name: string;
    sctId?: string | null;
    procedureType?: {
      __typename?: 'ProcedureType';
      _id: string;
      name: string;
    } | null;
  }>;
};

export const CreateWardsDocument = `
    mutation CreateWards($id: String!, $wards: [WardInput!]!) {
  createWard(hospitalId: $id, wards: $wards) {
    __typename
  }
}
    `;
export const CreateRoleTypeForHospitalDocument = `
    mutation CreateRoleTypeForHospital($role: NewHospitalRoleTypeInput!) {
  createHospitalRoleType(newRole: $role) {
    _id
    abbr
    title
  }
}
    `;
export const GrantPermissionDocument = `
    mutation GrantPermission($hospitalRoleTypeId: String!, $permissionIds: [String!]!) {
  setPermissionsToHospitalRoleType(
    hospitalRoleTypeId: $hospitalRoleTypeId
    permissionIds: $permissionIds
  ) {
    _id
    permissions {
      _id
    }
    title
  }
}
    `;
export const CreateDepartmentDocument = `
    mutation CreateDepartment($hospitalId: String!, $departments: [NewDepartmentInput!]!) {
  createDepartment(hospitalId: $hospitalId, newDepartments: $departments) {
    _id
  }
}
    `;
export const SendEmployeeRequestDocument = `
    mutation SendEmployeeRequest($employee: [EmployeeRequestGqlInput!]!) {
  createEmployeeRequests(employeeRequests: $employee) {
    _id
  }
}
    `;
export const CreateHospitalRolesDocument = `
    mutation createHospitalRoles($hospitalId: String!, $hospitalRoles: [NewHospitalRoleInput!]!) {
  createHospitalRoles(hospitalId: $hospitalId, newHospitalRoles: $hospitalRoles) {
    _id
  }
}
    `;
export const CreateRosterDocument = `
    mutation createRoster($wardIds: [String!]!, $rosterTemplate: RosterRequirementGqlInput!) {
  createShiftsWithTemplate(wardIds: $wardIds, rosterTemplate: $rosterTemplate) {
    success {
      ward {
        _id
        department {
          _id
        }
      }
      shifts {
        _id
        shiftTemplate {
          _id
          rosterType {
            _id
            typeName
          }
          ward {
            _id
            department {
              _id
            }
          }
          startTime {
            hour
            minute
          }
          duration {
            hour
            minute
          }
          requirements {
            minimumStrength
          }
          name
        }
        draftDutyChanges {
          newAllocations {
            _id
            email
            address
            picture
          }
          reusedDuties {
            _id
            allocation {
              _id
              email
              address
              picture
            }
            cancelledBy
            isPublished
          }
        }
      }
    }
    failed {
      wardId
      reason
    }
  }
}
    `;
export const AllocationDutiesShiftDocument = `
    mutation AllocationDutiesShift($allocationDuties: [AllocateDutiesToShiftGqlInput!]!) {
  allocateDutiesToShifts(allocations: $allocationDuties) {
    _id
  }
}
    `;
export const GetPublishRosterDocument = `
    mutation getPublishRoster($shiftIds: [String!]!) {
  publishRoster(shiftIds: $shiftIds) {
    _id
    shiftTemplate {
      _id
      rosterType {
        _id
        typeName
      }
      ward {
        _id
        department {
          _id
        }
      }
      startTime {
        hour
        minute
      }
      duration {
        hour
        minute
      }
      requirements {
        minimumStrength
      }
      name
    }
    ward {
      _id
    }
    startDate
    rosterType {
      _id
      typeName
    }
    duties {
      _id
      allocation {
        _id
        email
        address
        picture
      }
      cancelledBy
      isPublished
    }
    draftDutyChanges {
      newAllocations {
        _id
        email
        address
        picture
      }
      reusedDuties {
        _id
        allocation {
          _id
          email
          address
          picture
        }
        cancelledBy
        isPublished
      }
    }
    cancelledDuties {
      _id
      cancelledBy
    }
  }
}
    `;
export const GetEditRequirementsForShiftsDocument = `
    mutation getEditRequirementsForShifts($editRequirementsForShiftsInput: [EditRequirementsForShiftsGqlInput!]!) {
  editRequirementsForShifts(
    editRequirementsForShiftsInput: $editRequirementsForShiftsInput
  ) {
    _id
    draftDutyChanges {
      newAllocations {
        _id
        email
        address
        picture
      }
      reusedDuties {
        _id
        allocation {
          _id
          email
          address
          picture
        }
        cancelledBy
        isPublished
      }
    }
  }
}
    `;
export const GetHospitalByIdDocument = `
    query GetHospitalById($id: String!) {
  hospital: getHospitalById(hospitalId: $id) {
    _id
    address
    name
  }
}
    `;
export const GetWardsForHospitalDocument = `
    query GetWardsForHospital($id: String!) {
  hospital: getHospitalById(hospitalId: $id) {
    wards {
      _id
      abbr
      name
      wardType {
        _id
        color
        name
      }
      beds {
        number
        type
      }
      department {
        _id
        abbr
        name
      }
    }
  }
}
    `;
export const GetDepartmentForHospitalDocument = `
    query GetDepartmentForHospital($id: String!) {
  departments: getHospitalById(hospitalId: $id) {
    departments {
      _id
      abbr
      name
    }
  }
}
    `;
export const GetWardTypesDocument = `
    query GetWardTypes {
  wardType: getWardTypes {
    _id
    color
    name
  }
}
    `;
export const GetEmployeesForHospitalDocument = `
    query GetEmployeesForHospital($hospitalId: String!) {
  employees: getEmployeesByHospitalId(hospitalId: $hospitalId) {
    _id
    roles {
      _id
      employmentType {
        _id
      }
      from {
        month
        year
      }
      hospitalRole {
        hospitalRoleType {
          _id
          abbr
          title
        }
        department {
          name
          _id
        }
      }
    }
    user {
      _id
      fullName
      email
      phoneNumber
      picture
      profile {
        educations {
          degree
        }
      }
    }
  }
  departments: getHospitalById(hospitalId: $hospitalId) {
    departments {
      name
      abbr
      _id
    }
  }
}
    `;
export const GetHospitalRoleTypesDocument = `
    query GetHospitalRoleTypes($hospitalId: String!) {
  roleTypes: getHospitalRoleTypes(hospitalId: $hospitalId) {
    _id
    abbr
    category
    title
    permissions {
      _id
      category
      description
      name
    }
  }
}
    `;
export const GetAllPermissionsDocument = `
    query GetAllPermissions {
  permissions: getAllPermissions {
    _id
    category
    description
    name
  }
}
    `;
export const GetHospitalRoleDocument = `
    query GetHospitalRole($hospitalId: String!) {
  hospitalRoles: getHospitalRolesByHospitalId(hospitalId: $hospitalId) {
    _id
    hospitalRoleType {
      _id
      title
    }
  }
}
    `;
export const GetRosterTemplateRequirementDataDocument = `
    query GetRosterTemplateRequirementData {
  roles: getRoles {
    _id
    title
  }
}
    `;
export const GetRosterDocument = `
    query GetRoster($startDate: DateTime!, $endDate: DateTime!, $wardIds: [String!]!, $rosterTypeIds: [String!]) {
  roster: getRoster(
    roster: {startDate: $startDate, endDate: $endDate, wardIds: $wardIds, rosterTypeIds: $rosterTypeIds}
  ) {
    _id
    startDate
    duties {
      _id
      allocation {
        _id
        email
        address
        picture
        fullName
      }
      cancelledBy
      isPublished
    }
    cancelledDuties {
      _id
      allocation {
        _id
        email
        address
        picture
        fullName
        profile {
          educations {
            degree
          }
        }
        rxProfile {
          _id
          skill {
            canPerformProcedures {
              _id
              procedureType {
                _id
                name
              }
              sctId
              name
              isPreferredTerm
            }
          }
        }
      }
    }
    shiftTemplate {
      _id
      name
      startTime {
        hour
        minute
      }
      duration {
        hour
        minute
      }
      requirements {
        minimumStrength
        requiredProcedures {
          procedure {
            _id
            name
          }
        }
        requiredRoles {
          hospitalRoleType {
            _id
            hospitalRoleType {
              title
            }
          }
          minimumAssignments
        }
      }
    }
    draftDutyChanges {
      newAllocations {
        _id
        email
        address
        picture
        fullName
      }
      reusedDuties {
        _id
        allocation {
          _id
          email
          address
          picture
          fullName
        }
        cancelledBy
        isPublished
      }
    }
  }
}
    `;
export const GetRosterTypesDocument = `
    query GetRosterTypes {
  rosterTypes: getRosterTypes {
    _id
    typeName
  }
}
    `;
export const GetEmployeesListByHispitalIdDocument = `
    query GetEmployeesListByHispitalId($hospitalId: String!) {
  employees: getEmployeesByHospitalId(hospitalId: $hospitalId) {
    _id
    roles {
      _id
      from {
        month
        year
      }
      hospitalRole {
        hospitalRoleType {
          _id
          abbr
          title
        }
        department {
          name
          _id
        }
      }
    }
    user {
      _id
      email
      fullName
      address
      picture
      rxProfile {
        _id
        skill {
          canPerformProcedures {
            _id
            procedureType {
              _id
              name
            }
            sctId
            name
            isPreferredTerm
          }
        }
      }
    }
  }
}
    `;
export const GetEmployeesForShiftDocument = `
    query getEmployeesForShift($shiftDetails: ShiftDetailsInput!) {
  employees: getEmployeesForShift(shiftDetails: $shiftDetails) {
    _id
    roles {
      _id
      employmentType {
        _id
      }
      from {
        month
        year
      }
      hospitalRole {
        hospitalRoleType {
          _id
          abbr
          title
        }
        department {
          name
          _id
        }
      }
    }
    user {
      _id
      email
      fullName
      address
      picture
      rxProfile {
        _id
        skill {
          canPerformProcedures {
            _id
            procedureType {
              _id
              name
            }
            sctId
            name
            isPreferredTerm
          }
        }
      }
      profile {
        educations {
          degree
        }
      }
    }
  }
}
    `;
export const LoginAgainstQrTokenDocument = `
    mutation LoginAgainstQrToken($token: String!) {
  loginAgainstQrToken(token: $token) {
    _id
    dateOfBirth
    email
    fullName
    phoneNumber
    picture
  }
}
    `;
export const LoginDocument = `
    mutation Login {
  login {
    _id
  }
}
    `;
export const GenerateQrCodeDocument = `
    query GenerateQrCode {
  getQrCodeForLogin
}
    `;
export const GetCurrentUserDocument = `
    query GetCurrentUser {
  user: currentUser {
    _id
    phoneNumber
    picture
    email
    dateOfBirth
    fullName
  }
}
    `;
export const UpdateLanguageDocument = `
    mutation UpdateLanguage($userId: String!, $languages: [String!]!) {
  updateProfile(userId: $userId, profile: {languageIds: $languages}) {
    _id
    languages {
      _id
      value
    }
  }
}
    `;
export const GetUserProfileDocument = `
    query GetUserProfile($userId: String!) {
  user: findUser(by: _id, value: $userId) {
    _id
    phoneNumber
    picture
    email
    fullName
    profile {
      _id
      educations {
        degree
        from {
          month
          year
        }
        institution
        to {
          month
          year
        }
      }
      height {
        unit
        value
      }
      weight {
        unit
        value
      }
      languages {
        _id
        isIndian
        label
        scid
        value
      }
    }
    rxProfile {
      _id
      isVerified
      license {
        number
        validFrom
        validTill
      }
      skill {
        canPerformProcedures {
          _id
          procedureType {
            _id
            name
          }
          sctId
          name
          isPreferredTerm
        }
      }
      workExperience {
        affiliated {
          _id
          hospital {
            name
            _id
          }
          verificationStatus
          role {
            department
            employmentType {
              type
            }
            from {
              month
              year
            }
            to {
              month
              year
            }
            title
          }
        }
        unaffiliated {
          _id
          hospital
          role {
            department
            employmentType
            from {
              month
              year
            }
            title
            to {
              month
              year
            }
          }
        }
      }
    }
  }
}
    `;
export const GetAllLanguagesDocument = `
    query GetAllLanguages {
  languages: getAllLanguages {
    _id
    isIndian
    label
    value
  }
}
    `;
export const GetScheduleDocument = `
    query getSchedule($schedule: GetScheduleGqlInput!) {
  getSchedule(schedule: $schedule) {
    duties {
      _id
      shift {
        _id
        ward {
          _id
          name
        }
        shiftTemplate {
          _id
          duration {
            hour
            minute
          }
        }
        startDate
        cancelledDuties {
          _id
        }
        rosterType {
          _id
          typeName
        }
      }
    }
    unavailabilities {
      _id
      userId
      hospitalId
      from
      to
    }
  }
}
    `;
export const GetAllProceduresDocument = `
    query GetAllProcedures {
  getAllProcedures {
    _id
    isPreferredTerm
    name
    procedureType {
      _id
      name
    }
    sctId
    isPreferredTerm
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    CreateWards: build.mutation<
      CreateWardsMutation,
      CreateWardsMutationVariables
    >({
      query: variables => ({ document: CreateWardsDocument, variables }),
    }),
    CreateRoleTypeForHospital: build.mutation<
      CreateRoleTypeForHospitalMutation,
      CreateRoleTypeForHospitalMutationVariables
    >({
      query: variables => ({
        document: CreateRoleTypeForHospitalDocument,
        variables,
      }),
    }),
    GrantPermission: build.mutation<
      GrantPermissionMutation,
      GrantPermissionMutationVariables
    >({
      query: variables => ({ document: GrantPermissionDocument, variables }),
    }),
    CreateDepartment: build.mutation<
      CreateDepartmentMutation,
      CreateDepartmentMutationVariables
    >({
      query: variables => ({ document: CreateDepartmentDocument, variables }),
    }),
    SendEmployeeRequest: build.mutation<
      SendEmployeeRequestMutation,
      SendEmployeeRequestMutationVariables
    >({
      query: variables => ({
        document: SendEmployeeRequestDocument,
        variables,
      }),
    }),
    createHospitalRoles: build.mutation<
      CreateHospitalRolesMutation,
      CreateHospitalRolesMutationVariables
    >({
      query: variables => ({
        document: CreateHospitalRolesDocument,
        variables,
      }),
    }),
    createRoster: build.mutation<
      CreateRosterMutation,
      CreateRosterMutationVariables
    >({
      query: variables => ({ document: CreateRosterDocument, variables }),
    }),
    AllocationDutiesShift: build.mutation<
      AllocationDutiesShiftMutation,
      AllocationDutiesShiftMutationVariables
    >({
      query: variables => ({
        document: AllocationDutiesShiftDocument,
        variables,
      }),
    }),
    getPublishRoster: build.mutation<
      GetPublishRosterMutation,
      GetPublishRosterMutationVariables
    >({
      query: variables => ({ document: GetPublishRosterDocument, variables }),
    }),
    getEditRequirementsForShifts: build.mutation<
      GetEditRequirementsForShiftsMutation,
      GetEditRequirementsForShiftsMutationVariables
    >({
      query: variables => ({
        document: GetEditRequirementsForShiftsDocument,
        variables,
      }),
    }),
    GetHospitalById: build.query<
      GetHospitalByIdQuery,
      GetHospitalByIdQueryVariables
    >({
      query: variables => ({ document: GetHospitalByIdDocument, variables }),
    }),
    GetWardsForHospital: build.query<
      GetWardsForHospitalQuery,
      GetWardsForHospitalQueryVariables
    >({
      query: variables => ({
        document: GetWardsForHospitalDocument,
        variables,
      }),
    }),
    GetDepartmentForHospital: build.query<
      GetDepartmentForHospitalQuery,
      GetDepartmentForHospitalQueryVariables
    >({
      query: variables => ({
        document: GetDepartmentForHospitalDocument,
        variables,
      }),
    }),
    GetWardTypes: build.query<
      GetWardTypesQuery,
      GetWardTypesQueryVariables | void
    >({
      query: variables => ({ document: GetWardTypesDocument, variables }),
    }),
    GetEmployeesForHospital: build.query<
      GetEmployeesForHospitalQuery,
      GetEmployeesForHospitalQueryVariables
    >({
      query: variables => ({
        document: GetEmployeesForHospitalDocument,
        variables,
      }),
    }),
    GetHospitalRoleTypes: build.query<
      GetHospitalRoleTypesQuery,
      GetHospitalRoleTypesQueryVariables
    >({
      query: variables => ({
        document: GetHospitalRoleTypesDocument,
        variables,
      }),
    }),
    GetAllPermissions: build.query<
      GetAllPermissionsQuery,
      GetAllPermissionsQueryVariables | void
    >({
      query: variables => ({ document: GetAllPermissionsDocument, variables }),
    }),
    GetHospitalRole: build.query<
      GetHospitalRoleQuery,
      GetHospitalRoleQueryVariables
    >({
      query: variables => ({ document: GetHospitalRoleDocument, variables }),
    }),
    GetRosterTemplateRequirementData: build.query<
      GetRosterTemplateRequirementDataQuery,
      GetRosterTemplateRequirementDataQueryVariables | void
    >({
      query: variables => ({
        document: GetRosterTemplateRequirementDataDocument,
        variables,
      }),
    }),
    GetRoster: build.query<GetRosterQuery, GetRosterQueryVariables>({
      query: variables => ({ document: GetRosterDocument, variables }),
    }),
    GetRosterTypes: build.query<
      GetRosterTypesQuery,
      GetRosterTypesQueryVariables | void
    >({
      query: variables => ({ document: GetRosterTypesDocument, variables }),
    }),
    GetEmployeesListByHispitalId: build.query<
      GetEmployeesListByHispitalIdQuery,
      GetEmployeesListByHispitalIdQueryVariables
    >({
      query: variables => ({
        document: GetEmployeesListByHispitalIdDocument,
        variables,
      }),
    }),
    getEmployeesForShift: build.query<
      GetEmployeesForShiftQuery,
      GetEmployeesForShiftQueryVariables
    >({
      query: variables => ({
        document: GetEmployeesForShiftDocument,
        variables,
      }),
    }),
    LoginAgainstQrToken: build.mutation<
      LoginAgainstQrTokenMutation,
      LoginAgainstQrTokenMutationVariables
    >({
      query: variables => ({
        document: LoginAgainstQrTokenDocument,
        variables,
      }),
    }),
    Login: build.mutation<LoginMutation, LoginMutationVariables | void>({
      query: variables => ({ document: LoginDocument, variables }),
    }),
    GenerateQrCode: build.query<
      GenerateQrCodeQuery,
      GenerateQrCodeQueryVariables | void
    >({
      query: variables => ({ document: GenerateQrCodeDocument, variables }),
    }),
    GetCurrentUser: build.query<
      GetCurrentUserQuery,
      GetCurrentUserQueryVariables | void
    >({
      query: variables => ({ document: GetCurrentUserDocument, variables }),
    }),
    UpdateLanguage: build.mutation<
      UpdateLanguageMutation,
      UpdateLanguageMutationVariables
    >({
      query: variables => ({ document: UpdateLanguageDocument, variables }),
    }),
    GetUserProfile: build.query<
      GetUserProfileQuery,
      GetUserProfileQueryVariables
    >({
      query: variables => ({ document: GetUserProfileDocument, variables }),
    }),
    GetAllLanguages: build.query<
      GetAllLanguagesQuery,
      GetAllLanguagesQueryVariables | void
    >({
      query: variables => ({ document: GetAllLanguagesDocument, variables }),
    }),
    getSchedule: build.query<GetScheduleQuery, GetScheduleQueryVariables>({
      query: variables => ({ document: GetScheduleDocument, variables }),
    }),
    GetAllProcedures: build.query<
      GetAllProceduresQuery,
      GetAllProceduresQueryVariables | void
    >({
      query: variables => ({ document: GetAllProceduresDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const {
  useCreateWardsMutation,
  useCreateRoleTypeForHospitalMutation,
  useGrantPermissionMutation,
  useCreateDepartmentMutation,
  useSendEmployeeRequestMutation,
  useCreateHospitalRolesMutation,
  useCreateRosterMutation,
  useAllocationDutiesShiftMutation,
  useGetPublishRosterMutation,
  useGetEditRequirementsForShiftsMutation,
  useGetHospitalByIdQuery,
  useLazyGetHospitalByIdQuery,
  useGetWardsForHospitalQuery,
  useLazyGetWardsForHospitalQuery,
  useGetDepartmentForHospitalQuery,
  useLazyGetDepartmentForHospitalQuery,
  useGetWardTypesQuery,
  useLazyGetWardTypesQuery,
  useGetEmployeesForHospitalQuery,
  useLazyGetEmployeesForHospitalQuery,
  useGetHospitalRoleTypesQuery,
  useLazyGetHospitalRoleTypesQuery,
  useGetAllPermissionsQuery,
  useLazyGetAllPermissionsQuery,
  useGetHospitalRoleQuery,
  useLazyGetHospitalRoleQuery,
  useGetRosterTemplateRequirementDataQuery,
  useLazyGetRosterTemplateRequirementDataQuery,
  useGetRosterQuery,
  useLazyGetRosterQuery,
  useGetRosterTypesQuery,
  useLazyGetRosterTypesQuery,
  useGetEmployeesListByHispitalIdQuery,
  useLazyGetEmployeesListByHispitalIdQuery,
  useGetEmployeesForShiftQuery,
  useLazyGetEmployeesForShiftQuery,
  useLoginAgainstQrTokenMutation,
  useLoginMutation,
  useGenerateQrCodeQuery,
  useLazyGenerateQrCodeQuery,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useUpdateLanguageMutation,
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useGetAllLanguagesQuery,
  useLazyGetAllLanguagesQuery,
  useGetScheduleQuery,
  useLazyGetScheduleQuery,
  useGetAllProceduresQuery,
  useLazyGetAllProceduresQuery,
} = injectedRtkApi;
