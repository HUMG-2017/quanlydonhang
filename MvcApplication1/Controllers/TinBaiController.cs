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

namespace MvcApplication1.Controllers
{
    public class TinBaiController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<TinBaiViet> lst = (from table in db.TinBaiViets
                                        select table).ToList();
                string json = JsonConvert.SerializeObject(lst);
                return new string[] { json };
            }
            else
            {
                TinBaiViet obj = JsonConvert.DeserializeObject<TinBaiViet>(filter);
                List<TinBaiViet> lst = (from table in db.TinBaiViets
                                        where
                                            (obj.IdKenhTin == null || obj.IdKenhTin == table.IdKenhTin) &&
                                            (obj.TacGia == null || obj.TacGia == table.TacGia) &&
                                            (obj.TieuDe == null || obj.TieuDe == table.TieuDe) &&
                                            (obj.TomTat == null || obj.TomTat == table.TomTat)
                                        select table).ToList();
                string json = JsonConvert.SerializeObject(lst);
                return new string[] {json};
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            List<TinBaiViet> lst = db.TinBaiViets.Where(o => o.Id == id).ToList();
            string json = JsonConvert.SerializeObject(lst);
            return json;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
            TinBaiViet newobj = (TinBaiViet) JsonConvert.DeserializeObject(value);
            db.TinBaiViets.InsertOnSubmit(newobj);
            db.SubmitChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
            TinBaiViet obj = db.TinBaiViets.Where(o => o.Id == id).SingleOrDefault();
            TinBaiViet newobj = JsonConvert.DeserializeObject<TinBaiViet>(value);
            if (newobj.NoiDung != null) obj.NoiDung = newobj.NoiDung;
            if (newobj.TacGia != null) obj.TacGia = newobj.TacGia;
            if (newobj.TieuDe != null) obj.TieuDe = newobj.TieuDe;
            if (newobj.TomTat != null) obj.TomTat = newobj.TomTat;
            if (newobj.IdKenhTin != null) obj.IdKenhTin = newobj.IdKenhTin;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            TinBaiViet obj = db.TinBaiViets.Where(o => o.Id == id).SingleOrDefault();
            db.TinBaiViets.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}