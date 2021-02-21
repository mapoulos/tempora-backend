"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyHandler = void 0;
const serialize_error_1 = require("serialize-error");
const getCatalog_1 = __importDefault(require("./lib/handlers/catalog/getCatalog"));
const Router_1 = require("./lib/routing/Router");
const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "*",
    "access-control-allow-headers": "*",
};
const proxyHandler = async (event /*| ALBEvent*/) => {
    try {
        console.log(event);
        const router = new Router_1.Router(event);
        router.get("/data", getCatalog_1.default);
        const routerResponse = await router.routeRequest();
        return Object.assign(Object.assign({ headers: Object.assign({ "content-type": "application/json" }, corsHeaders) }, routerResponse), { body: typeof routerResponse.body === "string"
                ? routerResponse.body
                : JSON.stringify(routerResponse.body) });
    }
    catch (error) {
        const e = serialize_error_1.serializeError(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e,
            }),
        };
    }
};
exports.proxyHandler = proxyHandler;
