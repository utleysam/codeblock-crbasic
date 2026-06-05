/**
 * Shared CRBasic token lists — single source of truth for both
 * CodeMirror 6 and highlight.js highlighters.
 *
 * Ported from the VSCode CRBasic extension's TextMate grammar
 * (daiwalkr.cr-basic-ms-vscode, v2026.5.1).
 *
 * CRBasic is case-insensitive; all matching should use the "i" flag.
 */

// ── Keywords (keyword.control) ──────────────────────────────────────
export const KEYWORDS = [
  "Alias", "ArrayIndex", "BeginProg", "EndProg", "Call", "CallTable",
  "Case", "Is", "Const", "ConstTable", "EndConstTable", "ContinueScan",
  "Delay", "Dim", "Do", "Else", "ElseIf", "Then", "EndIf",
  "EndSequence", "ESSInitialize", "EssVariables", "Exit", "ExitDo",
  "ExitFor", "ExitFunction", "ExitScan", "ExitSub", "FileManage", "To",
  "Function", "EndFunction", "If", "IfTime", "IIF", "Include",
  "IncludeSection", "Loop", "NewFieldNames", "Optional", "Public",
  "ReadOnly", "Scan", "NextScan", "Select", "EndSelect",
  "SemaphoreGet", "SemaphoreRelease", "SlowSequence", "Step", "Sub",
  "EndSub", "SubScan", "NextSubScan", "TriggerSequence", "Units",
  "Until", "WaitDigTrig", "WaitTriggerSequence", "While", "Wend",
  "For", "Next",
];

// ── Preprocessor directives (keyword.control.preprocessor) ──────────
// Matched WITH the leading "#"
export const PREPROCESSOR = [
  "#If", "#Else", "#ElseIf", "#EndIf", "#IfDev", "#If_no_remove", "#UnDef",
];

// ── Logical operators (keyword.operator.logical) ────────────────────
export const LOGICAL_OPERATORS = [
  "AND", "IMP", "INTDV", "MOD", "NOT", "OR", "XOR",
];

// ── Constants (constant.character + constant.language) ───────────────
export const CONSTANTS = [
  "As", "True", "False",
  "LoggerType", "LoggerEndian", "CR_LITTLE_ENDIAN", "CR_BIG_ENDIAN",
];

// ── Built-in functions (entity.name.function.*) ─────────────────────
// Each sub-array corresponds to one TextMate category.

const CDM = [
  "CDM_ACPower", "CDM_Battery", "CDM_BrFull", "CDM_BrFull6W",
  "CDM_BrHalf", "CDM_BrHalf3W", "CDM_BrHalf4W", "CDM_BridgeFilt",
  "CDM_Delay", "CDM_ExciteI", "CDM_ExciteV", "CDM_FFTFilt",
  "CDM_MuxSelect", "CDM_PanelTemp", "CDM_PeriodAvg", "CDM_PulsePort",
  "CDM_Resistance", "CDM_Resistance3W", "CDM_SW12", "CDM_SW5",
  "CDM_TCComp", "CDM_TCDiff", "CDM_TCSE", "CDM_Therm107",
  "CDM_Therm108", "CDM_Therm109", "CDM_VoltDiff", "CDM_VoltFilt",
  "CDM_VoltSE", "CDM_VW300Config", "CDM_VW300Dynamic",
  "CDM_VW300Rainflow", "CDM_VW300Static", "CPIAddModule",
  "CPIFileSend", "CPISpeed", "RainFlowSample",
];

const CUSTOM_MENUS = [
  "DisplayLine", "DisplayMenu", "EndMenu", "DisplayValue", "MenuItem",
  "MenuPick", "MenuRecompile", "SubMenu", "EndSubMenu",
];

const DATA_TABLE = [
  "Average", "CardFlush", "CardOut", "DataEvent",
  "DataInterval", "DataTable", "EndTable", "DataTime", "ETsz",
  "FFTSample", "FieldClassify", "FieldNames", "FieldOrigin",
  "FileMark", "FillStop", "GOESAppend", "GOESField", "GoesTable",
  "Histogram", "Histogram4D", "LevelCrossing", "Maximum", "Median",
  "Minimum", "Moment", "OpenInterval", "ResetTable", "Sample",
  "SampleFieldCal", "SampleMaxMin", "StdDev", "StructureType",
  "EndStructureType", "TableFieldNames", "TableFile", "TableHide",
  "Totalize", "WindVector", "WorstCase",
];

const DATALOGGER_STATUS = [
  "ApplyandRestartSequence", "EndApplyandRestartSequence", "ArrayLength",
  "CalFile", "Calibrate", "CheckPort", "ClockChange", "ClockSet",
  "ComPortIsActive", "Data", "DataLong", "DaylightSaving",
  "DaylightSavingUS", "Debug", "DebugBreak", "Encryption", "Erase",
  "EthernetPower", "FieldCal", "FieldCalStrain", "GetRecord", "GPS",
  "InstructionTimes", "LineNum", "LoadFieldCal", "MonitorComms",
  "Move", "MuxSelect", "NewFieldCal", "NewFile", "PipeLineMode",
  "PortBridge", "PortGet", "PortPairConfig", "PortsConfig", "PortSet",
  "PreserveVariables", "PulsePort", "PWM", "Read", "ReadIO",
  "RealTime", "Restart", "Restore", "SDI12SensorSetup",
  "SDI12SensorResponse", "SecsSince1990", "SequentialMode",
  "SetSecurity", "SetSetting", "SetStatus", "ShutDownBegin",
  "ShutDownEnd", "Signature", "StationName", "SW12", "SWVX",
  "TimeIntoInterval", "TimeIsBetween", "Timer", "WatchdogTimer",
  "WriteIO",
];

const FILE_IO = [
  "FileClose", "FileCopy", "FileEncrypt", "FileList", "FileManage",
  "FileOpen", "FileRead", "FileReadLine", "FileRename", "FileSize",
  "FileTime", "FileWrite", "GetFile", "GZip", "NewFile", "SendFile",
];

const INTERNET = [
  "DHCPRenew", "EmailRecv", "EmailRelay", "EmailSend", "EthernetPower",
  "FTPClient", "HTTPGet", "HTTPOut", "HTTPPost", "HTTPPut", "IPInfo",
  "IPNetPower", "IPRoute", "IPTrace", "MQTTConnect", "MQTTPublish",
  "MQTTPublishConstTable", "MQTTPublishTable", "NetworkTimeProtocol",
  "PingIP", "PPPClose", "PPPOpen", "SMSRecv", "SMSSend",
  "SNMPVariable", "TCPActiveConnections", "TCPClose", "TCPOpen",
  "DNSQuery", "UDPDataGram", "UDPOpen", "UDPSocketClose",
  "UDPSocketOpen", "UDPSocketRecv", "UDPSocketSend", "WebPageBegin",
  "WebPageEnd", "XMLParse",
];

const MATH = [
  "ABS", "ACOS", "AddPrecise", "AngleDegrees", "ASCII", "ASIN",
  "ATN", "ATN2", "AvgRun", "AvgSpa", "Ceiling", "CheckSum", "COS",
  "COSH", "Covariance", "CovSpa", "CTYPE", "DewPoint", "EXP", "FFT",
  "FFTSpa", "FindSpa", "FIX", "Floor", "FRAC", "Hex", "HexToDec",
  "INT", "LN", "LOG", "LOG10", "Matrix", "MaxRun", "MaxSpa",
  "MinRun", "MinSpa", "MoveBytes", "MovePrecise", "PeakValley", "PRT",
  "PRTCalc", "PWR", "Rainflow", "Randomize", "RectPolar", "RMSSpa",
  "RND", "Round", "SatVP", "SGN", "SIN", "SINH", "SolarPosition",
  "SortSpa", "SortSpaIndexed", "SQR", "StdDevRun", "StdDevSpa",
  "StrainCalc", "TAN", "TANH", "TotalRun", "VaporPressure",
  "WetDryBulb",
];

const MEASUREMENTS = [
  "ACPower", "AM25T", "AVW200", "Battery", "BrFull", "BrFull6W",
  "BrHalf", "BrHalf3W", "BrHalf4W", "CS616", "CS7500", "CSAT3",
  "CSAT3B", "CSAT3BMonitor", "CurrentSE", "CWB100",
  "CWB100Diagnostics", "CWB100Routes", "CWB100RSSI", "EC100",
  "EC100Configure", "ExciteI", "ExciteV", "HydraProbe", "LI7200",
  "LI7700", "PanelTemp", "PeriodAvg", "PulseCount", "PulseCountReset",
  "Quadrature", "Resistance", "Resistance3W", "SDI12Recorder",
  "TCDiff", "TCSE", "TDR100", "TDR200", "TGA", "Therm107",
  "Therm108", "Therm109", "TimerInput", "VoltDiff", "VoltSE",
];

const PAKBUS = [
  "AcceptDataRecords", "Broadcast", "ClockReport", "DataGram",
  "EncryptExempt", "GetDataRecord", "GetFile", "GetVariables",
  "NetWork", "PakBusCLock", "Route", "RouteNeighbors", "Routes",
  "SendData", "SendFile", "SendGetVariables", "SendTableDef",
  "SendVariables", "StaticRoute", "TimeUntilTransmit",
];

const SDM = [
  "SDMAO4", "SDMAO4A", "SDMBeginPort", "SDMCAN", "SDMCD16AC",
  "SDMCD16Mask", "SDMCVO4", "SDMGeneric", "SDMINT8", "SDMIO16",
  "SDMSIO2R", "SDMSIO4", "SDMSpeed", "SDMSW8A", "SDMTrigger",
  "SDMX50",
];

const SPECIAL_COMM = [
  "ArgosData", "ArgosDataRepeat", "ArgosError", "ArgosSetup",
  "ArgosTransmit", "DialModem", "DialSequence", "DialEndSequence",
  "DNP", "DNPUpdate", "DNPVariable", "GOESData", "GOESGPS",
  "GOESSetup", "GOESStatus", "GPS", "I2COpen", "I2CRead", "I2CWrite",
  "ModBusClient", "ModBusServer", "ModemCallBack", "ModemHangup",
  "EndModemHangup", "SPIOpen", "SPIRead", "SPIWrite",
];

const SERIAL_IO = [
  "CheckSum", "ComPortIsActive", "MoveBytes", "SerialBrk",
  "SerialClose", "SerialFlush", "SerialIn", "SerialInBlock",
  "SerialInChk", "SerialInRecord", "SerialOpen", "SerialOut",
  "SerialOutBlock",
];

const STRING_MANIP = [
  "ASCII", "Base64Encode", "CHR", "FormatFloat", "FormatLong",
  "FormatLongLong", "Hex", "HexToDec", "InStr", "Left", "Len",
  "LowerCase", "LTrim", "Mid", "Replace", "Right", "RTrim",
  "SplitStr", "Sprintf", "StrComp", "Trim", "TypeOf", "UpperCase",
];

// Deduplicated flat list of all built-in functions
export const FUNCTIONS: string[] = Array.from(new Set([
  ...CDM, ...CUSTOM_MENUS, ...DATA_TABLE, ...DATALOGGER_STATUS,
  ...FILE_IO, ...INTERNET, ...MATH, ...MEASUREMENTS, ...PAKBUS,
  ...SDM, ...SPECIAL_COMM, ...SERIAL_IO, ...STRING_MANIP,
]));

// ── Helpers ─────────────────────────────────────────────────────────

/** Build a case-insensitive word-boundary regex from a list of words. */
export function wordRegex(words: string[]): RegExp {
  return new RegExp("\\b(" + words.join("|") + ")\\b", "i");
}

/** Build a Set of lower-cased words for fast O(1) lookup. */
export function wordSet(words: string[]): Set<string> {
  return new Set(words.map((w) => w.toLowerCase()));
}
