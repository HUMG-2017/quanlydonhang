using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MvcApplication1.Models;
using Newtonsoft.Json;
using MvcApplication1.Filters;

namespace MvcApplication1.Controllers
{
    public class KenhTinController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        // GET api/<controller>
        [JwtAuthentication]
        public IEnumerable<KenhTinBaiViet> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<KenhTinBaiViet> lst = (from table in db.KenhTinBaiViets
                                        select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
            else
            {
                KenhTinBaiViet obj = JsonConvert.DeserializeObject<KenhTinBaiViet>(filter);
                List<KenhTinBaiViet> lst = (from table in db.KenhTinBaiViets
                                        where
                                            (obj.MaCapTren == null || obj.MaCapTren == table.MaCapTren) 
                                        select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
        }

        // GET api/<controller>/5
        public List<KenhTinBaiViet> Get(int id)
        {
            List<KenhTinBaiViet> lst = db.KenhTinBaiViets.Where(o => o.Id == id).ToList();
            return lst;
            //string json = JsonConvert.SerializeObject(lst);
            //return json;
        }

        // POST api/<controller>
        public void Post([FromBody]KenhTinBaiViet value)
        {
           // KenhTinBaiViet newobj = (KenhTinBaiViet)JsonConvert.DeserializeObject(value);
            db.KenhTinBaiViets.InsertOnSubmit(value);
            db.SubmitChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]KenhTinBaiViet value)
        {
            KenhTinBaiViet obj = db.KenhTinBaiViets.Where(o => o.Id == id).SingleOrDefault();
            KenhTinBaiViet newobj = value;// JsonConvert.DeserializeObject<KenhTinBaiViet>(value);
            if (newobj.NoiDung != null) obj.NoiDung = newobj.NoiDung;
            if (newobj.MaCapTren != null) obj.MaCapTren = newobj.MaCapTren;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            KenhTinBaiViet obj = db.KenhTinBaiViets.Where(o => o.Id == id).SingleOrDefault();
            db.KenhTinBaiViets.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}