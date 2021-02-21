"use strict";
exports.__esModule = true;
exports.Router = void 0;
var Router = /** @class */ (function () {
    function Router(lambdaEvent) {
        var isALBEvent = function (e) {
            return e.path !== undefined;
        };
        var isAPIGatewayEvent = function (e) {
            return e.rawPath !== undefined;
        };
        this.body = lambdaEvent.body || undefined;
        this.requestHeaders = lambdaEvent.headers;
        if (isALBEvent(lambdaEvent)) {
            this.path = lambdaEvent.path;
            this.queryStringParameters = (lambdaEvent.queryStringParameters ||
                {});
            this.httpMethod = lambdaEvent.httpMethod;
        }
        else if (isAPIGatewayEvent(lambdaEvent)) {
            this.path = lambdaEvent.rawPath;
            this.queryStringParameters = (lambdaEvent.queryStringParameters ||
                {});
            this.httpMethod = lambdaEvent.requestContext.http.method;
        }
        else {
            throw "Unexpected event type passed to Router. Expecting ALBEvent or APIGatewayEvent";
        }
        this.pathParameters = {};
        this.routes = [];
    }
    Router.prototype.registerRoute = function (route) {
        var _this = this;
        var _isRouteMatch = function () {
            // if route doesn't match
            if (route.httpMethod !== _this.httpMethod)
                return false;
            // check path
            if (route.pathPattern.includes(":")) {
                // we have path params
                var pathPattern = route.pathPattern;
                var regex = new RegExp("^" + pathPattern.replace(/:\w+/g, "([\\w\\d-\\.]+)") + "$");
                var regexMatch = _this.path.match(regex);
                if (regexMatch === null) {
                    return false;
                }
                var pathParameterKeys = (pathPattern.match(/:\w+/g) || []).map(function (match) { return match.substring(1); });
                var pathParameterValues_1 = regexMatch.slice(1);
                var pathParameters = pathParameterKeys.reduce(function (accumulator, key, idx) {
                    accumulator[key] = pathParameterValues_1[idx];
                    return accumulator;
                }, {});
                _this.pathParameters = pathParameters;
                return true;
            }
            else {
                return (route.httpMethod === _this.httpMethod &&
                    route.pathPattern === _this.path);
            }
        };
        if (_isRouteMatch())
            this.routes.push(route);
    };
    Router.prototype.get = function (pathPattern, handler) {
        this.registerRoute({ httpMethod: "GET", pathPattern: pathPattern, handler: handler });
    };
    Router.prototype.post = function (pathPattern, handler) {
        this.registerRoute({ httpMethod: "POST", pathPattern: pathPattern, handler: handler });
    };
    Router.prototype.put = function (pathPattern, handler) {
        this.registerRoute({ httpMethod: "PUT", pathPattern: pathPattern, handler: handler });
    };
    Router.prototype.patch = function (pathPattern, handler) {
        this.registerRoute({ httpMethod: "PATCH", pathPattern: pathPattern, handler: handler });
    };
    Router.prototype.options = function (pathPattern, handler) {
        this.registerRoute({ httpMethod: "OPTIONS", pathPattern: pathPattern, handler: handler });
    };
    Router.prototype.routeRequest = function () {
        var route = this.routes[0];
        if (!route) {
            return Promise.reject({
                statusCode: 404,
                body: {
                    error: "No route found"
                }
            });
        }
        var input = {
            pathParameters: this.pathParameters,
            body: JSON.parse(this.body || "{}"),
            queryStringParameters: this.queryStringParameters,
            headers: this.requestHeaders
        };
        return route.handler(input);
    };
    return Router;
}());
exports.Router = Router;
