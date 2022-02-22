"use strict";
exports.__esModule = true;
exports.CommandHandlers = void 0;
var classify_mo_mt_handler_js_1 = require("./classify-mo-mt.handler.js");
var submit_community_members_count_handler_js_1 = require("./submit-community-members-count.handler.js");
var submit_mobile_originated_count_handler_js_1 = require("./submit-mobile-originated-count.handler.js");
var submit_mobile_terminated_count_handler_js_1 = require("./submit-mobile-terminated-count.handler.js");
var CommandHandlers = [
    classify_mo_mt_handler_js_1.ClassifyMoMtHandler,
    submit_community_members_count_handler_js_1.SubmitCommunityMembersCounterHandler,
    submit_mobile_originated_count_handler_js_1.SubmitMobileOriginatedCountHandler,
    submit_mobile_terminated_count_handler_js_1.SubmitMobileTerminatedCountHandler,
];
exports.CommandHandlers = CommandHandlers;
