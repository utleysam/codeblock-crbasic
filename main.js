"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CodeBlockCRBasicPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/cm6-crbasic.ts
var import_view = require("@codemirror/view");
var import_state = require("@codemirror/state");

// src/crbasic-tokens.ts
var KEYWORDS = [
  "Alias",
  "ArrayIndex",
  "BeginProg",
  "EndProg",
  "Call",
  "CallTable",
  "Case",
  "Is",
  "Const",
  "ConstTable",
  "EndConstTable",
  "ContinueScan",
  "Delay",
  "Dim",
  "Do",
  "Else",
  "ElseIf",
  "Then",
  "EndIf",
  "EndSequence",
  "ESSInitialize",
  "EssVariables",
  "Exit",
  "ExitDo",
  "ExitFor",
  "ExitFunction",
  "ExitScan",
  "ExitSub",
  "FileManage",
  "To",
  "Function",
  "EndFunction",
  "If",
  "IfTime",
  "IIF",
  "Include",
  "IncludeSection",
  "Loop",
  "NewFieldNames",
  "Optional",
  "Public",
  "ReadOnly",
  "Scan",
  "NextScan",
  "Select",
  "EndSelect",
  "SemaphoreGet",
  "SemaphoreRelease",
  "SlowSequence",
  "Step",
  "Sub",
  "EndSub",
  "SubScan",
  "NextSubScan",
  "TriggerSequence",
  "Units",
  "Until",
  "WaitDigTrig",
  "WaitTriggerSequence",
  "While",
  "Wend",
  "For",
  "Next"
];
var PREPROCESSOR = [
  "#If",
  "#Else",
  "#ElseIf",
  "#EndIf",
  "#IfDev",
  "#If_no_remove",
  "#UnDef"
];
var LOGICAL_OPERATORS = [
  "AND",
  "IMP",
  "INTDV",
  "MOD",
  "NOT",
  "OR",
  "XOR"
];
var CONSTANTS = [
  "As",
  "True",
  "False",
  "LoggerType",
  "LoggerEndian",
  "CR_LITTLE_ENDIAN",
  "CR_BIG_ENDIAN"
];
var CDM = [
  "CDM_ACPower",
  "CDM_Battery",
  "CDM_BrFull",
  "CDM_BrFull6W",
  "CDM_BrHalf",
  "CDM_BrHalf3W",
  "CDM_BrHalf4W",
  "CDM_BridgeFilt",
  "CDM_Delay",
  "CDM_ExciteI",
  "CDM_ExciteV",
  "CDM_FFTFilt",
  "CDM_MuxSelect",
  "CDM_PanelTemp",
  "CDM_PeriodAvg",
  "CDM_PulsePort",
  "CDM_Resistance",
  "CDM_Resistance3W",
  "CDM_SW12",
  "CDM_SW5",
  "CDM_TCComp",
  "CDM_TCDiff",
  "CDM_TCSE",
  "CDM_Therm107",
  "CDM_Therm108",
  "CDM_Therm109",
  "CDM_VoltDiff",
  "CDM_VoltFilt",
  "CDM_VoltSE",
  "CDM_VW300Config",
  "CDM_VW300Dynamic",
  "CDM_VW300Rainflow",
  "CDM_VW300Static",
  "CPIAddModule",
  "CPIFileSend",
  "CPISpeed",
  "RainFlowSample"
];
var CUSTOM_MENUS = [
  "DisplayLine",
  "DisplayMenu",
  "EndMenu",
  "DisplayValue",
  "MenuItem",
  "MenuPick",
  "MenuRecompile",
  "SubMenu",
  "EndSubMenu"
];
var DATA_TABLE = [
  "Average",
  "CardFlush",
  "CardOut",
  "DataEvent",
  "DataInterval",
  "DataTable",
  "EndTable",
  "DataTime",
  "ETsz",
  "FFTSample",
  "FieldClassify",
  "FieldNames",
  "FieldOrigin",
  "FileMark",
  "FillStop",
  "GOESAppend",
  "GOESField",
  "GoesTable",
  "Histogram",
  "Histogram4D",
  "LevelCrossing",
  "Maximum",
  "Median",
  "Minimum",
  "Moment",
  "OpenInterval",
  "ResetTable",
  "Sample",
  "SampleFieldCal",
  "SampleMaxMin",
  "StdDev",
  "StructureType",
  "EndStructureType",
  "TableFieldNames",
  "TableFile",
  "TableHide",
  "Totalize",
  "WindVector",
  "WorstCase"
];
var DATALOGGER_STATUS = [
  "ApplyandRestartSequence",
  "EndApplyandRestartSequence",
  "ArrayLength",
  "CalFile",
  "Calibrate",
  "CheckPort",
  "ClockChange",
  "ClockSet",
  "ComPortIsActive",
  "Data",
  "DataLong",
  "DaylightSaving",
  "DaylightSavingUS",
  "Debug",
  "DebugBreak",
  "Encryption",
  "Erase",
  "EthernetPower",
  "FieldCal",
  "FieldCalStrain",
  "GetRecord",
  "GPS",
  "InstructionTimes",
  "LineNum",
  "LoadFieldCal",
  "MonitorComms",
  "Move",
  "MuxSelect",
  "NewFieldCal",
  "NewFile",
  "PipeLineMode",
  "PortBridge",
  "PortGet",
  "PortPairConfig",
  "PortsConfig",
  "PortSet",
  "PreserveVariables",
  "PulsePort",
  "PWM",
  "Read",
  "ReadIO",
  "RealTime",
  "Restart",
  "Restore",
  "SDI12SensorSetup",
  "SDI12SensorResponse",
  "SecsSince1990",
  "SequentialMode",
  "SetSecurity",
  "SetSetting",
  "SetStatus",
  "ShutDownBegin",
  "ShutDownEnd",
  "Signature",
  "StationName",
  "SW12",
  "SWVX",
  "TimeIntoInterval",
  "TimeIsBetween",
  "Timer",
  "WatchdogTimer",
  "WriteIO"
];
var FILE_IO = [
  "FileClose",
  "FileCopy",
  "FileEncrypt",
  "FileList",
  "FileManage",
  "FileOpen",
  "FileRead",
  "FileReadLine",
  "FileRename",
  "FileSize",
  "FileTime",
  "FileWrite",
  "GetFile",
  "GZip",
  "NewFile",
  "SendFile"
];
var INTERNET = [
  "DHCPRenew",
  "EmailRecv",
  "EmailRelay",
  "EmailSend",
  "EthernetPower",
  "FTPClient",
  "HTTPGet",
  "HTTPOut",
  "HTTPPost",
  "HTTPPut",
  "IPInfo",
  "IPNetPower",
  "IPRoute",
  "IPTrace",
  "MQTTConnect",
  "MQTTPublish",
  "MQTTPublishConstTable",
  "MQTTPublishTable",
  "NetworkTimeProtocol",
  "PingIP",
  "PPPClose",
  "PPPOpen",
  "SMSRecv",
  "SMSSend",
  "SNMPVariable",
  "TCPActiveConnections",
  "TCPClose",
  "TCPOpen",
  "DNSQuery",
  "UDPDataGram",
  "UDPOpen",
  "UDPSocketClose",
  "UDPSocketOpen",
  "UDPSocketRecv",
  "UDPSocketSend",
  "WebPageBegin",
  "WebPageEnd",
  "XMLParse"
];
var MATH = [
  "ABS",
  "ACOS",
  "AddPrecise",
  "AngleDegrees",
  "ASCII",
  "ASIN",
  "ATN",
  "ATN2",
  "AvgRun",
  "AvgSpa",
  "Ceiling",
  "CheckSum",
  "COS",
  "COSH",
  "Covariance",
  "CovSpa",
  "CTYPE",
  "DewPoint",
  "EXP",
  "FFT",
  "FFTSpa",
  "FindSpa",
  "FIX",
  "Floor",
  "FRAC",
  "Hex",
  "HexToDec",
  "INT",
  "LN",
  "LOG",
  "LOG10",
  "Matrix",
  "MaxRun",
  "MaxSpa",
  "MinRun",
  "MinSpa",
  "MoveBytes",
  "MovePrecise",
  "PeakValley",
  "PRT",
  "PRTCalc",
  "PWR",
  "Rainflow",
  "Randomize",
  "RectPolar",
  "RMSSpa",
  "RND",
  "Round",
  "SatVP",
  "SGN",
  "SIN",
  "SINH",
  "SolarPosition",
  "SortSpa",
  "SortSpaIndexed",
  "SQR",
  "StdDevRun",
  "StdDevSpa",
  "StrainCalc",
  "TAN",
  "TANH",
  "TotalRun",
  "VaporPressure",
  "WetDryBulb"
];
var MEASUREMENTS = [
  "ACPower",
  "AM25T",
  "AVW200",
  "Battery",
  "BrFull",
  "BrFull6W",
  "BrHalf",
  "BrHalf3W",
  "BrHalf4W",
  "CS616",
  "CS7500",
  "CSAT3",
  "CSAT3B",
  "CSAT3BMonitor",
  "CurrentSE",
  "CWB100",
  "CWB100Diagnostics",
  "CWB100Routes",
  "CWB100RSSI",
  "EC100",
  "EC100Configure",
  "ExciteI",
  "ExciteV",
  "HydraProbe",
  "LI7200",
  "LI7700",
  "PanelTemp",
  "PeriodAvg",
  "PulseCount",
  "PulseCountReset",
  "Quadrature",
  "Resistance",
  "Resistance3W",
  "SDI12Recorder",
  "TCDiff",
  "TCSE",
  "TDR100",
  "TDR200",
  "TGA",
  "Therm107",
  "Therm108",
  "Therm109",
  "TimerInput",
  "VoltDiff",
  "VoltSE"
];
var PAKBUS = [
  "AcceptDataRecords",
  "Broadcast",
  "ClockReport",
  "DataGram",
  "EncryptExempt",
  "GetDataRecord",
  "GetFile",
  "GetVariables",
  "NetWork",
  "PakBusCLock",
  "Route",
  "RouteNeighbors",
  "Routes",
  "SendData",
  "SendFile",
  "SendGetVariables",
  "SendTableDef",
  "SendVariables",
  "StaticRoute",
  "TimeUntilTransmit"
];
var SDM = [
  "SDMAO4",
  "SDMAO4A",
  "SDMBeginPort",
  "SDMCAN",
  "SDMCD16AC",
  "SDMCD16Mask",
  "SDMCVO4",
  "SDMGeneric",
  "SDMINT8",
  "SDMIO16",
  "SDMSIO2R",
  "SDMSIO4",
  "SDMSpeed",
  "SDMSW8A",
  "SDMTrigger",
  "SDMX50"
];
var SPECIAL_COMM = [
  "ArgosData",
  "ArgosDataRepeat",
  "ArgosError",
  "ArgosSetup",
  "ArgosTransmit",
  "DialModem",
  "DialSequence",
  "DialEndSequence",
  "DNP",
  "DNPUpdate",
  "DNPVariable",
  "GOESData",
  "GOESGPS",
  "GOESSetup",
  "GOESStatus",
  "GPS",
  "I2COpen",
  "I2CRead",
  "I2CWrite",
  "ModBusClient",
  "ModBusServer",
  "ModemCallBack",
  "ModemHangup",
  "EndModemHangup",
  "SPIOpen",
  "SPIRead",
  "SPIWrite"
];
var SERIAL_IO = [
  "CheckSum",
  "ComPortIsActive",
  "MoveBytes",
  "SerialBrk",
  "SerialClose",
  "SerialFlush",
  "SerialIn",
  "SerialInBlock",
  "SerialInChk",
  "SerialInRecord",
  "SerialOpen",
  "SerialOut",
  "SerialOutBlock"
];
var STRING_MANIP = [
  "ASCII",
  "Base64Encode",
  "CHR",
  "FormatFloat",
  "FormatLong",
  "FormatLongLong",
  "Hex",
  "HexToDec",
  "InStr",
  "Left",
  "Len",
  "LowerCase",
  "LTrim",
  "Mid",
  "Replace",
  "Right",
  "RTrim",
  "SplitStr",
  "Sprintf",
  "StrComp",
  "Trim",
  "TypeOf",
  "UpperCase"
];
var FUNCTIONS = Array.from(/* @__PURE__ */ new Set([
  ...CDM,
  ...CUSTOM_MENUS,
  ...DATA_TABLE,
  ...DATALOGGER_STATUS,
  ...FILE_IO,
  ...INTERNET,
  ...MATH,
  ...MEASUREMENTS,
  ...PAKBUS,
  ...SDM,
  ...SPECIAL_COMM,
  ...SERIAL_IO,
  ...STRING_MANIP
]));
function wordSet(words) {
  return new Set(words.map((w) => w.toLowerCase()));
}

// src/tokenizer.ts
var kwSet = wordSet(KEYWORDS);
var opsSet = wordSet(LOGICAL_OPERATORS);
var constsSet = wordSet(CONSTANTS);
var fnsSet = wordSet(FUNCTIONS);
var preprocSet = new Set(PREPROCESSOR.map((p) => p.toLowerCase()));
function tokenizeLine(line, offset) {
  const tokens = [];
  let i = 0;
  const len = line.length;
  while (i < len) {
    if (/\s/.test(line[i])) {
      i++;
      continue;
    }
    if (line[i] === "'") {
      tokens.push({ from: offset + i, to: offset + len, type: "comment" });
      break;
    }
    if (line[i] === '"') {
      const start = i;
      i++;
      while (i < len && line[i] !== '"') i++;
      if (i < len) i++;
      tokens.push({ from: offset + start, to: offset + i, type: "string" });
      continue;
    }
    if (line[i] === "#") {
      const m = line.slice(i).match(/^#\w+/i);
      if (m && preprocSet.has(m[0].toLowerCase())) {
        tokens.push({ from: offset + i, to: offset + i + m[0].length, type: "meta" });
        i += m[0].length;
        continue;
      }
      i++;
      continue;
    }
    if (/\d/.test(line[i])) {
      const m = line.slice(i).match(/^\d+(\.\d+)?/);
      if (m) {
        tokens.push({ from: offset + i, to: offset + i + m[0].length, type: "number" });
        i += m[0].length;
        continue;
      }
    }
    const opMatch = line.slice(i).match(/^(<>|>>|<<|>=|<=|\*=|\+=|-=|\/=|\\=|\^=|&=)/);
    if (opMatch) {
      tokens.push({ from: offset + i, to: offset + i + opMatch[0].length, type: "operator" });
      i += opMatch[0].length;
      continue;
    }
    if (/[+\-*/\\^<>=&@!]/.test(line[i])) {
      tokens.push({ from: offset + i, to: offset + i + 1, type: "operator" });
      i++;
      continue;
    }
    if (/[A-Za-z_]/.test(line[i])) {
      const m = line.slice(i).match(/^[A-Za-z_]\w*/);
      if (m) {
        const word = m[0].toLowerCase();
        let type = null;
        if (kwSet.has(word)) type = "keyword";
        else if (opsSet.has(word)) type = "operator";
        else if (constsSet.has(word)) type = "atom";
        else if (fnsSet.has(word)) type = "builtin";
        if (type) {
          tokens.push({ from: offset + i, to: offset + i + m[0].length, type });
        }
        i += m[0].length;
        continue;
      }
    }
    i++;
  }
  return tokens;
}
function cmClass(type) {
  return `cm-${type}`;
}

// src/cm6-crbasic.ts
var decoCache = {};
function getDeco(type) {
  const cls = cmClass(type);
  if (!decoCache[cls]) {
    decoCache[cls] = import_view.Decoration.mark({ class: cls });
  }
  return decoCache[cls];
}
var CRBasicHighlighter = class {
  constructor(view) {
    this.decorations = this.buildDecorations(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }
  buildDecorations(view) {
    const builder = new import_state.RangeSetBuilder();
    const doc = view.state.doc;
    let inCrbasicBlock = false;
    const contentLines = [];
    for (let i = 1; i <= doc.lines; i++) {
      const line = doc.line(i);
      const trimmed = line.text.trim().toLowerCase();
      if (!inCrbasicBlock) {
        if (/^```crbasic\s*$/i.test(line.text.trim())) {
          inCrbasicBlock = true;
          contentLines.length = 0;
          continue;
        }
      } else {
        if (/^```\s*$/.test(line.text.trim())) {
          for (const cl of contentLines) {
            const tokens = tokenizeLine(cl.text, cl.from);
            for (const tok of tokens) {
              if (tok.from < tok.to) {
                builder.add(tok.from, tok.to, getDeco(tok.type));
              }
            }
          }
          inCrbasicBlock = false;
          continue;
        }
        contentLines.push({ from: line.from, text: line.text });
      }
    }
    return builder.finish();
  }
};
var crbasicHighlighter = import_view.ViewPlugin.fromClass(CRBasicHighlighter, {
  decorations: (v) => v.decorations
});

// src/main.ts
var PRISM_CLASSES = {
  keyword: ["token", "keyword"],
  builtin: ["token", "function"],
  operator: ["token", "operator"],
  atom: ["token", "boolean"],
  number: ["token", "number"],
  string: ["token", "string"],
  comment: ["token", "comment"],
  meta: ["token", "keyword"]
};
var CodeBlockCRBasicPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerEditorExtension(crbasicHighlighter);
    this.registerMarkdownCodeBlockProcessor("crbasic", (source, el) => {
      const pre = el.createEl("pre", { cls: ["language-crbasic"] });
      const code = pre.createEl("code", { cls: ["language-crbasic", "is-loaded"] });
      const lines = source.split("\n");
      for (let li = 0; li < lines.length; li++) {
        const lineText = lines[li];
        const tokens = tokenizeLine(lineText, 0);
        if (tokens.length === 0) {
          code.appendText(lineText);
        } else {
          let cursor = 0;
          for (const tok of tokens) {
            if (tok.from > cursor) {
              code.appendText(lineText.slice(cursor, tok.from));
            }
            code.createEl("span", {
              cls: PRISM_CLASSES[tok.type],
              text: lineText.slice(tok.from, tok.to)
            });
            cursor = tok.to;
          }
          if (cursor < lineText.length) {
            code.appendText(lineText.slice(cursor));
          }
        }
        if (li < lines.length - 1) {
          code.appendText("\n");
        }
      }
    });
  }
  onunload() {
  }
};
