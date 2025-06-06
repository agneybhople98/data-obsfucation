import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment, { max } from 'moment';
import {
  QueryBuilderClassNames,
  QueryBuilderConfig,
} from 'ngx-angular-query-builder';
import { JobsDataService } from '../../jobs-data.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-query-builder',
  standalone: false,
  templateUrl: './query-builder.component.html',
  styleUrl: './query-builder.component.scss',
})
export class QueryBuilderComponent implements OnInit, OnChanges {
  campaignOne: FormGroup = new FormGroup({
    start: new FormControl(moment()), // Use moment() instead of new Date()
    end: new FormControl(moment().add(7, 'days')), // Add 7 days as an example
  });
  emptyRulesetMessage =
    'Please add condition, condition group cannot be left empty ';
  @ViewChild('f', { static: true })
  queryBuilderFormGroup!: NgForm;
  public selectedValue: any;
  @Input() public selectedItem: any;
  @Input() elementData: any;

  // domain
  currentDomain: string = 'utility';

  // Toggle Button options
  customValue: string = 'yes';
  directValue: string = 'include';

  onChange(value: string) {
    console.log('Ruleset condition changed:', value);
    // Add any additional logic here
  }

  onDirectValueChange(value: string) {
    console.log('Direct value changed:', value);
    // Add any additional logic here
  }

  public queryCtrl: FormControl;

  public bootstrapClassNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    arrowIcon: 'fa fa-chevron-right px-2',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control',
    inputControlSize: 'col-auto',
  };

  public query: any = {
    condition: 'and',
    rules: [
      {
        // This will be replaced with specific field/values based on the selected configuration
        field: '',
        operator: '',
        value: null,
      },
    ],
  };

  // CI_PER configuration
  public ciPerConfig: QueryBuilderConfig = {
    fields: {
      PER_ID: {
        name: 'PER_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },

      DATE: {
        name: 'DATE',
        type: 'date',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
        options: [
          {
            name: 'Date of Ranges',
            value: 'DATE_OF_RANGES',
          },
        ],
      },
      LANGUAGE_CD: {
        name: 'LANGUAGE_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
        options: [],
      },
      PER_OR_BUS_FLG: {
        name: 'PER_OR_BUS_FLG',
        type: 'category',
        options: [
          { name: 'Person', value: 'P' },
          { name: 'Business', value: 'B' },
        ],
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      LS_SL_FLG: {
        name: 'LS_SL_FLG',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      LS_SL_DESCR: {
        name: 'LS_SL_DESCR',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      EMAILID: {
        name: 'EMAILID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      OVRD_MAIL_NAME1: {
        name: 'OVRD_MAIL_NAME1',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      OVRD_MAIL_NAME2: {
        name: 'OVRD_MAIL_NAME2',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      OVRD_MAIL_NAME3: {
        name: 'OVRD_MAIL_NAME3',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS1: {
        name: 'ADDRESS1',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS2: {
        name: 'ADDRESS2',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS3: {
        name: 'ADDRESS3',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS4: {
        name: 'ADDRESS4',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CITY: {
        name: 'CITY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      NUM1: {
        name: 'NUM1',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      NUM2: {
        name: 'NUM2',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      COUNTY: {
        name: 'COUNTY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      POSTAL: {
        name: 'POSTAL',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      HOUSE_TYPE: {
        name: 'HOUSE_TYPE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      GEO_CODE: {
        name: 'GEO_CODE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      IN_CITY_LIMIT: {
        name: 'IN_CITY_LIMIT',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      STATE: {
        name: 'STATE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      COUNTRY: { name: 'COUNTRY', type: 'string' },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      RECV_MKTG_INFO_FLG: {
        name: 'RECV_MKTG_INFO_FLG',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      WEB_PASSWD: { name: 'WEB_PASSWD', type: 'string' },
      WEB_PWD_HINT_FLG: { name: 'WEB_PWD_HINT_FLG', type: 'string' },
      WEB_PASSWD_ANS: {
        name: 'WEB_PASSWD_ANS',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PER_DATA_AREA: {
        name: 'PER_DATA_AREA',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };
  // CI_PER_NAME configuration
  public ciPerNameConfig: QueryBuilderConfig = {
    fields: {
      PER_ID: {
        name: 'PER_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      SEQ_NUM: {
        name: 'SEQ_NUM',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ENTITY_NAME: {
        name: 'ENTITY_NAME',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PRIM_NAME_SW: {
        name: 'PRIM_NAME_SW',
        type: 'string',
        nullable: true,
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ENTITY_NAME_UPR: {
        name: 'ENTITY_NAME_UPR',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };

  public ciPerAddreasConfig: QueryBuilderConfig = {
    fields: {
      PER_ID: {
        name: 'PER_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      SEQ_NUM: {
        name: 'SEQ_NUM',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS1: {
        name: 'ADDRESS 1',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS2: {
        name: 'ADDRESS 2',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS3: {
        name: 'ADDRESS 3',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADDRESS4: {
        name: 'ADDRESS 4',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CITY: {
        name: 'CITY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      NUM1: {
        name: 'NUM1',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      NUM2: {
        name: 'NUM2',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      COUNTY: {
        name: 'COUNTY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      POSTAL: {
        name: 'POSTAL',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      HOUSE_TYPE: {
        name: 'HOUSE_TYPE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      GEO_CODE: {
        name: 'GEO_CODE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      IN_CITY_LIMIT: {
        name: 'IN_CITY_LIMIT',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      STATE: {
        name: 'STATE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      COUNTRY: {
        name: 'COUNTRY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      SEASON_START_MMDD: {
        name: 'SEASON_START_MMDD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      SEASON_END_MMDD: {
        name: 'SEASON_END_MMDD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      EFF_STATUS: {
        name: 'EFF_STATUS',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };

  public ciPerContdetConfig: QueryBuilderConfig = {
    fields: {
      C1_CONTACT_ID: {
        name: 'C1_CONTACT_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PER_ID: {
        name: 'PER_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      COMM_RTE_TYPE_CD: {
        name: 'COMM_RTE_TYPE_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CONTACT_VALUE: {
        name: 'CONTACT_VALUE',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CND_PRIMARY_FLAG: {
        name: 'CND_PRIMARY_FLAG',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CONTACT_VALUE_EXT: {
        name: 'CONTACT_VALUE_EXT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      DND_START_TM: {
        name: 'DND_START_TM',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      DND_END_TM: {
        name: 'DND_END_TM',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CND_VERIFY_STATUS_FLAG: {
        name: 'CND_VERIFY_STATUS_FLAG',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CND_ACTINACT_FLG: {
        name: 'CND_ACTINACT_FLG',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CONTACT_NAME: {
        name: 'CONTACT_NAME',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };

  public ciPerCharConfig: QueryBuilderConfig = {
    fields: {
      PER_ID: {
        name: 'PER_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_TYPE_CD: {
        name: 'CHAR_TYPE_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_VAL: {
        name: 'CHAR_VAL',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      EFFDT: {
        name: 'EFFDT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ADHOC_CHAR_VAL: {
        name: 'ADHOC_CHAR_VAL',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_VAL_FK1: {
        name: 'CHAR_VAL_FK1',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_VAL_FK2: {
        name: 'CHAR_VAL_FK2',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_VAL_FK3: {
        name: 'CHAR_VAL_FK3',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_VAL_FK4: {
        name: 'CHAR_VAL_FK4',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CHAR_VAL_FK5: {
        name: 'CHAR_VAL_FK5',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      SRCH_CHAR_VAL: {
        name: 'SRCH_CHAR_VAL',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };
  public ciPerIdConfig: QueryBuilderConfig = {
    fields: {
      PER_ID: {
        name: 'PER_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ID_TYPE_CD: {
        name: 'ID_TYPE_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PER_ID_NBR: {
        name: 'PER_ID_NBR',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PRIM_SW: {
        name: 'PRIM_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ENCR_PER_ID_NBR: {
        name: 'ENCR_PER_ID_NBR',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      HASH_PER_ID_NBR: {
        name: 'HASH_PER_ID_NBR',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };
  // CI_PER configuration
  public ciAccountsConfig: QueryBuilderConfig = {
    // ACCT_ID, BILL_CYC_CD, SETUP_DT, CURRENCY_CD, ACCT_MGMT_GRP_CD, ALERT_INFO, BILL_AFTER_DT, PROTECT_CYC_SW, CIS_DIVISION, MAILING_PERM_ID, PROTECT_PREM_SW, COLL_CL_CD,
    // CR_REVIEW_DT, POSTPONE_CR_RVW_DT, INT_CR_REVIEW_SW, CUST_CL_CD, BILL_PRT_INTERCEPT, NO_DEP_RVW_SW, BUD_PLAN_CD, VERSION, PROTECT_DIV_SW, ACCESS_GRP_CD, ACCT_DATA_AREA, BILL_LEAD_DAYS,
    //  ACCT_USAGE_FLG, TRIAL_BILL_SW, REPRICING_SW, CRE_BY, LAST_UPD_BY, CRE_DTTM, LAST_UPD_DTTM, PRODUCT_CD, EXCL_ACCR_SW, BUS_OBJ_CD
    fields: {
      ACCT_ID: {
        name: 'ACCT_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },

      BILL_CYC_CD: {
        name: 'BILL_CYC_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
        options: [
          {
            name: 'Date of Ranges',
            value: 'DATE_OF_RANGES',
          },
        ],
      },
      SETUP_DT: {
        name: 'SETUP_DT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
        options: [],
      },
      CURRENCY_CD: {
        name: 'CURRENCY_CD',
        type: 'category',
        options: [
          { name: 'INR', value: 'INR' },
          { name: 'USD', value: 'USD' },
        ],
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ACCT_MGMT_GRP_CD: {
        name: 'ACCT_MGMT_GRP_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ALERT_INFO: {
        name: 'ALERT_INFO',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      BILL_AFTER_DT: {
        name: 'BILL_AFTER_DT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PROTECT_CYC_SW: {
        name: 'PROTECT_CYC_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CIS_DIVISION: {
        name: 'CIS_DIVISION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      MAILING_PERM_ID: {
        name: 'MAILING_PERM_ID',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PROTECT_PREM_SW: {
        name: 'PROTECT_PREM_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      COLL_CL_CD: {
        name: 'COLL_CL_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CR_REVIEW_DT: {
        name: 'CR_REVIEW_DT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      POSTPONE_CR_RVW_DT: {
        name: 'POSTPONE_CR_RVW_DT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      INT_CR_REVIEW_SW: {
        name: 'INT_CR_REVIEW_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CUST_CL_CD: {
        name: 'CUST_CL_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      BILL_PRT_INTERCEPT: {
        name: 'BILL_PRT_INTERCEPT',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      NO_DEP_RVW_SW: {
        name: 'NO_DEP_RVW_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      BUD_PLAN_CD: {
        name: 'BUD_PLAN_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      VERSION: {
        name: 'VERSION',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PROTECT_DIV_SW: {
        name: 'PROTECT_DIV_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ACCESS_GRP_CD: {
        name: 'ACCESS_GRP_CD',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ACCT_DATA_AREA: {
        name: 'ACCT_DATA_AREA',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },

      BILL_LEAD_DAYS: {
        name: 'BILL_LEAD_DAYS',
        type: 'boolean',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      ACCT_USAGE_FLG: { name: 'ACCT_USAGE_FLG', type: 'string' },
      TRIAL_BILL_SW: { name: 'TRIAL_BILL_SW', type: 'string' },
      REPRICING_SW: {
        name: 'REPRICING_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      CRE_BY: {
        name: 'CRE_BY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      LAST_UPD_BY: {
        name: 'LAST_UPD_BY',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },

      CRE_DTTM: {
        name: 'CRE_DTTM',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      LAST_UPD_DTTM: {
        name: 'LAST_UPD_DTTM',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      PRODUCT_CD: {
        name: 'PRODUCT_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      EXCL_ACCR_SW: {
        name: 'EXCL_ACCR_SW',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
      BUS_OBJ_CD: {
        name: 'BUS_OBJ_CD',
        type: 'string',
        operators: [
          '=',
          '!=',
          '<',
          '>',
          '<=',
          '>=',
          'BETWEEN',
          'NOT LIKE',
          'LIKE',
          'NOT IN',
          'IN',
          'IS_NULL',
          'IS_NOT_NULL',
        ],
      },
    },
  };
  public currentConfig: QueryBuilderConfig;
  public allowRuleset: boolean = true;
  public allowCollapse: boolean = true;
  public persistValueOnFieldChange: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public jobService: JobsDataService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.ciPerConfig;
  }

  ngOnInit(): void {
    // Subscribe to route params
    this.route.params.subscribe((params) => {
      this.currentDomain = params['domain'] || 'utility';
    });

    if (this.currentDomain === 'utility') {
      this.jobService.initializeUtilityData();
    }
    if (this.currentDomain === 'healthcare') {
      this.jobService.initializeHealthcareData();
    }
    this.updateConfigBasedOnSelectedItem();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem']) {
      this.updateConfigBasedOnSelectedItem();
    }
  }

  updateConfigBasedOnSelectedItem(): void {
    // Update configuration based on selected item
    switch (this.selectedItem) {
      case 'CI_PER':
        this.currentConfig = this.ciPerConfig;
        break;
      case 'CI_ACCT':
        this.currentConfig = this.ciAccountsConfig;
        break;
      case 'CI_PER_NAME':
        this.currentConfig = this.ciPerNameConfig;
        break;
      case 'CI_PER_ADDR_SEAS':
        this.currentConfig = this.ciPerAddreasConfig;
        break;
      case 'CI_PER_CONTDET':
        this.currentConfig = this.ciPerContdetConfig;
        break;
      case 'CI_PER_CHAR':
        this.currentConfig = this.ciPerCharConfig;
        break;
      case 'CI_PER_ID':
        this.currentConfig = this.ciPerIdConfig;
        break;
      default:
        this.currentConfig = this.ciPerConfig; // Use default config if no match
        break;
    }

    // Check if we're in create subset mode
    if (this._router.url.includes('create-subset')) {
      // Initialize with empty conditions for create subset
      this.query = {
        condition: 'and',
        rules: [],
      };
      this.queryCtrl = this.formBuilder.control(this.query);
      return; // Exit early for create subset mode
    }

    // Keep all existing conditions for view subset mode
    if (this.selectedItem === 'CI_PER') {
      this.query = null;
      this.queryCtrl = this.formBuilder.control(null);
    } else if (
      this.selectedItem === 'CI_ACCT' &&
      this._router.url.includes('/healthcare') &&
      this._router.url.includes('SP-98765')
    ) {
      // Get field references
      const firstField = Object.keys(this.currentConfig.fields)[3]; // Currency CD
      const secondField = Object.keys(this.currentConfig.fields)[15]; // CUST_CL_CD
      const thirdField = Object.keys(this.currentConfig.fields)[2]; // SETUP_DT (for nested condition)
      const fourthField = Object.keys(this.currentConfig.fields)[8]; // CIS_DIVISION
      const acctIdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'ACCT_ID' ||
            key === 'ACCT_ID'
        ) || Object.keys(this.currentConfig.fields)[0]; // fallback to first field if ACCT_ID not found
      const billCycCdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'BILL_CYC_CD' ||
            key === 'BILL_CYC_CD'
        ) || Object.keys(this.currentConfig.fields)[10]; // fallback if BILL_CYC_CD not found

      // Create comprehensive query with all three healthcare conditions
      this.query = {
        condition: 'and',
        rules: [
          // First AND group
          {
            condition: 'or',
            rules: [
              {
                field: secondField, // CUST_CL_CD
                operator: '=',
                value: 'INDV',
              },
              {
                field: firstField, // CURRENCY_CD
                operator: '=',
                value: 'USD',
              },
            ],
          },
          // Second AND group (nested)
          {
            condition: 'and',
            rules: [
              {
                field: thirdField, // SETUP_DT
                operator: '>=',
                value: '01-10-2024',
              },
              {
                field: fourthField, // CIS_DIVISION
                operator: '=',
                value: 'CNS',
              },
            ],
          },
        ],
      };

      // Update form control with new query
      this.queryCtrl = this.formBuilder.control(this.query);
    } else if (
      this.selectedItem === 'CI_ACCT' &&
      this._router.url.includes('/healthcare') &&
      this._router.url.includes('SP-98764')
    ) {
      // Get field references
      const firstField = Object.keys(this.currentConfig.fields)[3]; // Currency CD
      const secondField = Object.keys(this.currentConfig.fields)[15]; // CUST_CL_CD
      const thirdField = Object.keys(this.currentConfig.fields)[2]; // SETUP_DT (for nested condition)
      const fourthField = Object.keys(this.currentConfig.fields)[8]; // CIS_DIVISION
      const acctIdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'ACCT_ID' ||
            key === 'ACCT_ID'
        ) || Object.keys(this.currentConfig.fields)[0]; // fallback to first field if ACCT_ID not found
      const billCycCdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'BILL_CYC_CD' ||
            key === 'BILL_CYC_CD'
        ) || Object.keys(this.currentConfig.fields)[10]; // fallback if BILL_CYC_CD not found

      // Subset Plan 1: ACCT_ID IN specific values
      this.query = {
        condition: 'or',
        rules: [
          {
            field: acctIdField,
            operator: 'IN',
            value: '(6626465837,0945885147,1434124158,4198853193,4548338258)',
          },
        ],
      };

      // Update form control with new query
      this.queryCtrl = this.formBuilder.control(this.query);
    } else if (
      this.selectedItem === 'CI_ACCT' &&
      this._router.url.includes('/healthcare') &&
      this._router.url.includes('SP-98763')
    ) {
      // Get field references
      const firstField = Object.keys(this.currentConfig.fields)[3]; // Currency CD
      const secondField = Object.keys(this.currentConfig.fields)[15]; // CUST_CL_CD
      const thirdField = Object.keys(this.currentConfig.fields)[2]; // SETUP_DT (for nested condition)
      const fourthField = Object.keys(this.currentConfig.fields)[8]; // CIS_DIVISION
      const acctIdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'ACCT_ID' ||
            key === 'ACCT_ID'
        ) || Object.keys(this.currentConfig.fields)[0]; // fallback to first field if ACCT_ID not found
      const billCycCdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'BILL_CYC_CD' ||
            key === 'BILL_CYC_CD'
        ) || Object.keys(this.currentConfig.fields)[10]; // fallback if BILL_CYC_CD not found
      this.query = {
        condition: 'and',
        rules: [
          // First OR group (CUST_CL_CD = 'GRP' OR CURRENCY_CD = 'USD')
          {
            condition: 'or',
            rules: [
              {
                field: secondField, // CUST_CL_CD
                operator: '=',
                value: 'GRP',
              },
              {
                field: firstField, // CURRENCY_CD
                operator: '=',
                value: 'USD',
              },
            ],
          },
          // CIS_DIVISION = 'COM'
          {
            field: fourthField, // CIS_DIVISION
            operator: '=',
            value: 'COM',
          },
          // BILL_CYC_CD = 'MM11'
          {
            field: billCycCdField, // BILL_CYC_CD
            operator: '=',
            value: 'MM11',
          },
        ],
      };
    } else if (
      this.selectedItem === 'CI_ACCT' &&
      this._router.url.includes('/healthcare') &&
      (this._router.url.includes('SP-98762') ||
        this._router.url.includes('SP-98761') ||
        this._router.url.includes('SP-98760') ||
        this._router.url.includes('SP-98759'))
    ) {
      // Get field references
      const firstField = Object.keys(this.currentConfig.fields)[3]; // Currency CD
      const secondField = Object.keys(this.currentConfig.fields)[15]; // CUST_CL_CD
      const thirdField = Object.keys(this.currentConfig.fields)[2]; // SETUP_DT (for nested condition)
      const fourthField = Object.keys(this.currentConfig.fields)[8]; // CIS_DIVISION
      const acctIdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'ACCT_ID' ||
            key === 'ACCT_ID'
        ) || Object.keys(this.currentConfig.fields)[0]; // fallback to first field if ACCT_ID not found
      const billCycCdField =
        Object.keys(this.currentConfig.fields).find(
          (key) =>
            this.currentConfig.fields[key].name === 'BILL_CYC_CD' ||
            key === 'BILL_CYC_CD'
        ) || Object.keys(this.currentConfig.fields)[10]; // fallback if BILL_CYC_CD not found

      // Create comprehensive query with all three healthcare conditions
      this.query = {
        condition: 'and',
        rules: [
          // First AND group
          {
            condition: 'or',
            rules: [
              {
                field: secondField, // CUST_CL_CD
                operator: '=',
                value: 'INDV',
              },
              {
                field: firstField, // CURRENCY_CD
                operator: '=',
                value: 'USD',
              },
            ],
          },
          // Second AND group (nested)
          {
            condition: 'and',
            rules: [
              {
                field: thirdField, // SETUP_DT
                operator: '>=',
                value: '01-10-2024',
              },
              {
                field: fourthField, // CIS_DIVISION
                operator: '=',
                value: 'CNS',
              },
            ],
          },
        ],
      };

      // Update form control with new query
      this.queryCtrl = this.formBuilder.control(this.query);
    } else {
      const firstField = Object.keys(this.currentConfig.fields)[3]; // Currency CD
      const secondField = Object.keys(this.currentConfig.fields)[15]; // CUST_CL_CD
      const thirdField = Object.keys(this.currentConfig.fields)[2]; // SETUP_DT (for nested condition)
      const fourthField = Object.keys(this.currentConfig.fields)[8]; // CIS_DIVISION

      // Reset query with the complex nested structure
      this.query = {
        condition: 'and', // Main OR condition
        rules: [
          // First AND group
          {
            condition: 'or',
            rules: [
              {
                field: secondField, // CUST_CL_CD
                operator: '=',
                value: 'R',
              },
              {
                field: firstField, // SETUP_DT
                operator: '=',
                value: 'USD',
              },
            ],
          },
          // Second AND group (nested)
          {
            condition: 'and',
            rules: [
              {
                field: thirdField, // SETUP_DT
                operator: '>=',
                value: '01-10-2024',
              },
              {
                field: fourthField, // CIS_DIVISION
                operator: '=',
                value: 'CA',
              },
            ],
          },
        ],
      };

      // Update form control with new query
      this.queryCtrl = this.formBuilder.control(this.query);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.queryBuilderFormGroup.form.markAllAsTouched(), 0);
  }

  // switchModes(event: Event) {
  //   this.currentConfig = (<HTMLInputElement>event.target).checked
  //     ? this.entityConfig
  //     : this.config;
  // }

  changeDisabled(event: Event) {
    (<HTMLInputElement>event.target).checked
      ? this.queryCtrl.disable()
      : this.queryCtrl.enable();
  }

  private _counter = 0;
  formRuleWeakMap = new WeakMap();

  getUniqueName(prefix: string, rule: any) {
    if (!this.formRuleWeakMap.has(rule)) {
      this.formRuleWeakMap.set(rule, `${prefix}-${++this._counter}`);
    }

    return this.formRuleWeakMap.get(rule);
  }

  execute() {
    const formValue = this.queryCtrl.value;

    // Process each rule to handle BETWEEN operator
    const processedRules = formValue.rules.map((rule: any) => {
      if (rule.operator === 'BETWEEN' && rule.value) {
        return {
          ...rule,
          value: {
            min: rule.value.min || null,
            max: rule.value.max || null,
          },
        };
      }
      return rule;
    });

    const result = {
      ...formValue,
      rules: processedRules,
    };

    console.log('query builder form group', result);
  }
}
