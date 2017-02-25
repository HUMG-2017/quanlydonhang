using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace MvcApplication1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Filters.Add(new AuthorizeAttribute());

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
            name: "ApiWithId",
            routeTemplate: "Api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional },
            constraints: new { id = @"^[0-9]+$" });

            config.Routes.MapHttpRoute(
                name: "ApiWithAction",
                routeTemplate: "api/{controller}/{action}/{name}",
                defaults: null,
                constraints: new { name = @"^[a-z]+$" });

            config.Routes.MapHttpRoute(
                name: "ApiByAction",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { action = "Get" },
                constraints: new { id = @"^[0-9]+$" });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

      
            //return json format
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
