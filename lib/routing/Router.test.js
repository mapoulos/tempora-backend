"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Router_1 = require("./Router");
var albEvent = {
    requestContext: {
        elb: {
            targetGroupArn: "arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a"
        }
    },
    httpMethod: "GET",
    path: "/lambda",
    queryStringParameters: {
        query: "1234ABCD"
    },
    headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-encoding": "gzip",
        "accept-language": "en-US,en;q=0.9",
        connection: "keep-alive",
        host: "lambda-alb-123578498.us-east-2.elb.amazonaws.com",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        "x-amzn-trace-id": "Root=1-5c536348-3d683b8b04734faae651f476",
        "x-forwarded-for": "72.12.164.125",
        "x-forwarded-port": "80",
        "x-forwarded-proto": "http",
        "x-imforwards": "20"
    },
    body: "",
    isBase64Encoded: false
};
test("Test ALBEvent Parsing", function () {
    var router = new Router_1.Router(albEvent);
    expect(router.path).toBe("/lambda");
    expect(router.httpMethod).toBe("GET");
    expect(router.queryStringParameters).toMatchObject({ query: "1234ABCD" });
    expect(router.requestHeaders["accept"]).toBeDefined();
});
var apiGatewayEvent = {
    version: "2.0",
    routeKey: "$default",
    rawPath: "/my/path",
    rawQueryString: "parameter1=value1&parameter1=value2&parameter2=value",
    cookies: ["cookie1", "cookie2"],
    headers: {
        Header1: "value1",
        Header2: "value1,value2"
    },
    queryStringParameters: {
        parameter1: "value1,value2",
        parameter2: "value"
    },
    requestContext: {
        accountId: "123456789012",
        apiId: "api-id",
        authorizer: {
            jwt: {
                claims: {
                    claim1: "value1",
                    claim2: "value2"
                },
                scopes: ["scope1", "scope2"]
            }
        },
        domainName: "id.execute-api.us-east-1.amazonaws.com",
        domainPrefix: "id",
        http: {
            method: "POST",
            path: "/my/path",
            protocol: "HTTP/1.1",
            sourceIp: "IP",
            userAgent: "agent"
        },
        requestId: "id",
        routeKey: "$default",
        stage: "$default",
        time: "12/Mar/2020:19:03:58 +0000",
        timeEpoch: 1583348638390
    },
    body: "Hello from Lambda",
    pathParameters: {},
    isBase64Encoded: false,
    stageVariables: {
        stageVariable1: "value1",
        stageVariable2: "value2"
    }
};
test("Test APIGatewayProxyEvent Parsing", function () {
    var router = new Router_1.Router(apiGatewayEvent);
    expect(router.path).toBe("/my/path");
    expect(router.httpMethod).toBe("POST");
    expect(router.queryStringParameters.parameter2).toBeDefined();
    expect(router.requestHeaders["Header1"]).toBeDefined();
});
var apiGatewayEventPostEvent = {
    version: "2.0",
    routeKey: "$default",
    rawPath: "/jobs",
    rawQueryString: "parameter1=value1&parameter1=value2&parameter2=value",
    cookies: ["cookie1", "cookie2"],
    headers: {
        Header1: "value1",
        Header2: "value1,value2"
    },
    queryStringParameters: {
        parameter1: "value1,value2",
        parameter2: "value"
    },
    requestContext: {
        accountId: "123456789012",
        apiId: "api-id",
        authorizer: {
            jwt: {
                claims: {
                    claim1: "value1",
                    claim2: "value2"
                },
                scopes: ["scope1", "scope2"]
            }
        },
        domainName: "id.execute-api.us-east-1.amazonaws.com",
        domainPrefix: "id",
        http: {
            method: "POST",
            path: "/jobs",
            protocol: "HTTP/1.1",
            sourceIp: "IP",
            userAgent: "agent"
        },
        requestId: "id",
        routeKey: "$default",
        stage: "$default",
        time: "12/Mar/2020:19:03:58 +0000",
        timeEpoch: 1583348638390
    },
    body: "{}",
    pathParameters: {},
    isBase64Encoded: false,
    stageVariables: {
        stageVariable1: "value1",
        stageVariable2: "value2"
    }
};
test("Empty Router returns 404", function () { return __awaiter(void 0, void 0, void 0, function () {
    var router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                router = new Router_1.Router(apiGatewayEventPostEvent);
                return [4 /*yield*/, expect(router.routeRequest()).rejects.toHaveProperty("statusCode", 404)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("Router with incorrect path returns 404", function () { return __awaiter(void 0, void 0, void 0, function () {
    var event, router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event = __assign(__assign({}, apiGatewayEventPostEvent), { rawPath: "/jobs" });
                router = new Router_1.Router(event);
                router.post("/users", function () {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            type: "POST"
                        }
                    });
                });
                return [4 /*yield*/, expect(router.routeRequest()).rejects.toHaveProperty("statusCode", 404)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("Match route by method", function () { return __awaiter(void 0, void 0, void 0, function () {
    var event, router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event = __assign(__assign({}, apiGatewayEventPostEvent), { rawPath: "/jobs" });
                router = new Router_1.Router(event);
                router.post("/users", function () {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            type: "POST"
                        }
                    });
                });
                router.post("/jobs", function () {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            type: "POST"
                        }
                    });
                });
                router.get("/jobs", function () {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            type: "GET"
                        }
                    });
                });
                return [4 /*yield*/, expect(router.routeRequest()).resolves.toHaveProperty("body.type", "POST")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("Match with path parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
    var event, router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event = __assign(__assign({}, albEvent), { path: "/jobs/1234/csv", httpMethod: "GET" });
                router = new Router_1.Router(event);
                router.post("/jobs/:jobId", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters
                        }
                    });
                });
                router.get("/jobs/:jobId/csv", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters,
                            action: "CSV"
                        }
                    });
                });
                router.get("/jobs/:jobId/json", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters,
                            action: "JSON"
                        }
                    });
                });
                return [4 /*yield*/, expect(router.routeRequest()).resolves.toHaveProperty("body.action", "CSV")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("Match with multiple parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
    var event, router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event = __assign(__assign({}, albEvent), { path: "/users/1234/connections/5678", httpMethod: "GET" });
                router = new Router_1.Router(event);
                router.get("/users", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters,
                            action: "LIST_USERS"
                        }
                    });
                });
                router.get("/users/:userId", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters,
                            action: "GET_USER"
                        }
                    });
                });
                router.get("/users/:userId/connections", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters,
                            action: "LIST_USER_CONNECTIONS"
                        }
                    });
                });
                router.get("/users/:userId/connections/:connectionId", function (params) {
                    return Promise.resolve({
                        statusCode: 200,
                        body: {
                            pathParameters: params.pathParameters,
                            action: "GET_USER_CONNECTION"
                        }
                    });
                });
                return [4 /*yield*/, expect(router.routeRequest()).resolves.toHaveProperty("body.action", "GET_USER_CONNECTION")];
            case 1:
                _a.sent();
                return [4 /*yield*/, expect(router.routeRequest()).resolves.toHaveProperty("body.pathParameters.connectionId", "5678")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
