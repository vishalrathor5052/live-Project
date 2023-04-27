/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Duty,
  Employee,
  EmployeeRole,
  Shift,
  User,
  WardBed,
  WardType,
  CancelledByGqlEnum,
} from 'src/generated/graphql';

export type Maybe<T> = T | undefined | null;
export interface Item {
  label?: string | undefined;
  path: string;
  exact?: boolean | undefined;
  helper?: string | undefined;
  icon: any | undefined;
  activeIcon?: any | undefined;
  title: string | undefined;
}

export interface SidebarProps {
  textStyle: Record<string, unknown>;
}

export interface weekDayInterface {
  id: number;
  name: string;
  date?: Date;
  checked?: boolean;
}

export interface EventProps {
  event?: {
    id: number | string;
    title?: string;
    time?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resourceId?: number | string;
    leave?: boolean;
  };
}

export interface CalendarProps {
  events?: Array<EventProps['event']>;
}

export interface ShiftTemplate {
  startTime: string;
  endTime: string;
  shiftType: string;
}

export enum DNDColumnIds {
  allocations = 'allocations',
  available = 'available',
  cancelledDuties = 'cancelledDuties',
}

export interface Employees {
  _id: string;
  roles?: Array<EmployeeRole>;
  user?: User;
  allocation?: User;
}

export interface IDoctor extends Employees {
  id: string;
  index: number;
  inCharge?: boolean;
  key?: string | number;
  typeId?: string | undefined;
  isCancelled?: boolean | undefined;
}

export interface IDropColumn {
  list: IDoctor[] | Array<any>;
  id: DNDColumnIds;
  isCancelled?: boolean | undefined;
}

export interface DatePickerProps {
  label: string;
}
export interface IconProps {
  IconName?: Maybe<any> | undefined;
  imgSrc?: Maybe<any> | undefined;
  fontSize?: string | number | undefined;
  label?: string | undefined;
  size?: Maybe<any> | undefined;
  color?: string | undefined;
  customStyle?: Maybe<any> | undefined;
  onHandleWeek?: (event: any) => void | any;
}

export interface SelectProps {
  id?: any;
  label: string;
  options: Array<any>;
  labelKey?: any;
  getValue?: any;
  onHandleChange?: ((event: any) => void | any) | any;
  isLabel?: boolean | undefined;
  color?: string | undefined;
}

export interface AutocompleteProps {
  id: any;
  label: string;
  options: Array<any>;
  multiple: boolean;
  isCheckbox?: boolean;
  getOptionLabel?: string;
}

export interface ButtonProps {
  label: string;
  variant: Maybe<any>;
  disable?: boolean | undefined;
  color?: Maybe<any> | undefined;
  size?: Maybe<any> | undefined;
  StartIcon?: Maybe<any> | undefined;
  sx?: Record<string, unknown>;
  onClick?: () => void | unknown;
}

export interface TypographyProps {
  title: string | undefined;
  variant?: Maybe<any>;
  component?: Maybe<any>;
  sx?: Maybe<any>;
  wrap?: boolean | undefined;
  className?: string | undefined;
  color?: string | undefined;
}

export interface AddRosterProps {
  shiftTemplate: Array<any>;
  onClose: () => void | unknown;
}

export interface DragNDropProps {
  onDragEnd: (list: ColumnsType) => void | any;
  shiftIds: Array<Maybe<any>>;
}

export interface RadioComponentProps {
  stylesSheet: Record<string, unknown>;
  value: number;
  label: string;
}

export interface RosterEmployeeDetailsComponentProps {
  styles: Record<string, unknown>;
  fullName: string;
}

export interface RosterSearchWardType {
  color: string;
  name: string;
}
export interface AllocationList extends DutyType {
  length: number;
}

export interface ShiftTeamplateType extends Shift {
  shiftType: string;
  endTime: string;
  startTime: string;
}

export interface LeftAddRosterComponentProps {
  shiftTemplate: Array<ShiftTeamplateType>;
  classes: any;
  allocationList: AllocationList;
}
export interface ColumnsType {
  available?: {
    id: string;
    list: Array<Employee> | any;
  };
  allocations?: {
    id: string;
    list: Array<User> | any;
  };
  cancelledDuties?: {
    id: string;
    list: Array<Duty> | any;
  };
  newEndCol?: {
    id: string;
    list: Array<User | Employee> | any;
  };
  newStartCol?: {
    id: string;
    list: Array<User | Employee> | any;
  };
}

export interface CustomShiftTemplateType extends Shift {
  startTime: any;
  endTime: any;
  shiftType: string;
}

export interface WardsTypes {
  _id: string;
  abbr: string;
  beds?: Array<WardBed>;
  department?: {
    _id: string;
    abbr: string;
    name: string;
  } | null;
  name: string;
  wardType?: WardType;
}

export interface GetRosterType {
  _id: string;
  startDate: string;
  duties: Array<{
    _id: string;
    cancelledBy?: CancelledByGqlEnum | null;
    isPublished: boolean;
    allocation?: {
      _id: string;
      email?: string | null;
      address?: string | null;
      picture?: string | null;
      fullName: string;
    };
    user?: {
      _id: string;
      email?: string | null;
      address?: string | null;
      picture?: string | null;
      fullName: string;
    };
  }>;
  cancelledDuties: Array<{
    _id: string;
    allocation: {
      _id: string;
      email?: string | null;
      address?: string | null;
      picture?: string | null;
      fullName: string;
      profile: {
        educations: Array<{ degree: string }>;
      };
      rxProfile?: {
        _id: string;
        skill?: {
          canPerformProcedures: Array<{
            _id: string;
            sctId?: string | null;
            name: string;
            isPreferredTerm: boolean;
            procedureType?: {
              _id: string;
              name: string;
            } | null;
          }>;
        } | null;
      } | null;
    };
  }>;
  shiftTemplate: {
    _id: string;
    name: string;
    startTime: {
      hour: number;
      minute: number;
    };
    duration: {
      hour: number;
      minute: number;
    };
    requirements: {
      minimumStrength: number;
      requiredProcedures?: Array<{
        procedure: { _id: string; name: string };
      }> | null;
      requiredRoles?: Array<{
        minimumAssignments: number;
        hospitalRoleType: {
          _id: string;
          hospitalRoleType: {
            title: string;
          };
        };
      }> | null;
    };
  };
  draftDutyChanges?: {
    newAllocations?: Array<{
      _id: string;
      email?: string | null;
      address?: string | null;
      picture?: string | null;
      fullName?: string;
    }> | null;
    reusedDuties?: Array<{
      _id: string;
      cancelledBy?: CancelledByGqlEnum | null;
      isPublished: boolean;
      allocation: {
        _id: string;
        email?: string | null;
        address?: string | null;
        picture?: string | null;
        fullName?: string;
      };
    }> | null;
  } | null;
}

export interface GetEmployeeByHospitalIDType {
  _id: string;
  roles: Array<{
    _id: string;
    from?: {
      month: number;
      year: number;
    } | null;
    hospitalRole: {
      hospitalRoleType: {
        _id: string;
        abbr: string;
        title: string;
      };
      department?: {
        name: string;
        _id: string;
      } | null;
    };
  }>;
  user: {
    _id: string;
    email?: string | null;
    fullName: string;
    address?: string | null;
    picture?: string | null;
    rxProfile?: {
      _id: string;
      skill?: {
        canPerformProcedures: Array<{
          _id: string;
          sctId?: string | null;
          name: string;
          isPreferredTerm: boolean;
          procedureType?: {
            _id: string;
            name: string;
          } | null;
        }>;
      } | null;
    } | null;
  };
}

export interface LoaderProps {
  paddingTop?: string;
}

export interface SchedulesType {
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
}

export interface DutyType {
  _id?: string;
  cancelledBy?: CancelledByGqlEnum | null;
  isPublished?: boolean;
  allocation?: {
    _id: string;
    email?: string | null;
    address?: string | null;
    picture?: string | null;
    fullName?: string;
  };
  user?: {
    _id: string;
    email?: string | null;
    address?: string | null;
    picture?: string | null;
    fullName?: string;
  };
}

export interface EmployeeRoleType {
  _id: string;
  from?: {
    month: number;
    year: number;
  } | null;
  hospitalRole: {
    hospitalRoleType: {
      _id: string;
      abbr: string;
      title: string;
    };
    department?: {
      name: string;
      _id: string;
    } | null;
  };
}
