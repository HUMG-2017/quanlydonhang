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
    [JwtAuthentication]
    public class LoHangController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        // GET api/<controller>
        public IEnumerable<QuanLyLoHang> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<QuanLyLoHang> lst = (from table in db.QuanLyLoHangs
                                        select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
            else
            {
                QuanLyLoHang obj = JsonConvert.DeserializeObject<QuanLyLoHang>(filter);
                List<QuanLyLoHang> lst = (from table in db.QuanLyLoHangs
                                        where
                                            (obj.CuocQuaBien == null || obj.CuocQuaBien == table.CuocQuaBien) &&
                                            (obj.CuocVeKho == null || obj.CuocVeKho == table.CuocVeKho) &&
                                            (obj.ListIdDonHang == null || obj.ListIdDonHang == table.ListIdDonHang) &&
                                            (obj.NguoiChuyenBien == null || obj.NguoiChuyenBien == table.NguoiChuyenBien) &&
                                            (obj.NguoiNhanKho == null || obj.NguoiNhanKho == table.NguoiNhanKho) &&
                                            (obj.ThoiGian == null || obj.ThoiGian == table.ThoiGian)
                                        select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
        }

        // GET api/<controller>/5
        public List<QuanLyLoHang> Get(int id)
        {
            List<QuanLyLoHang> lst = db.QuanLyLoHangs.Where(o => o.Id == id).ToList();
            return lst;
            //string json = JsonConvert.SerializeObject(lst);
            //return json;
        }

        // POST api/<controller>
        public void Post([FromBody]List<QuanLyLoHang> value)
        {
            //QuanLyLoHang newobj = (QuanLyLoHang)JsonConvert.DeserializeObject(value);
            foreach (var lohang in value)
            {
                db.QuanLyLoHangs.InsertOnSubmit(lohang);
                db.SubmitChanges();
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]QuanLyLoHang value)
        {
            QuanLyLoHang obj = db.QuanLyLoHangs.Where(o => o.Id == id).SingleOrDefault();
            QuanLyLoHang newobj = value;// JsonConvert.DeserializeObject<QuanLyLoHang>(value);
            if (newobj.CuocQuaBien != null) obj.CuocQuaBien = newobj.CuocQuaBien;
            if (newobj.CuocVeKho != null) obj.CuocVeKho = newobj.CuocVeKho;
            if (newobj.ListIdDonHang != null) obj.ListIdDonHang = newobj.ListIdDonHang;
            if (newobj.NguoiChuyenBien != null) obj.NguoiChuyenBien = newobj.NguoiChuyenBien;
            if (newobj.NguoiNhanKho != null) obj.NguoiNhanKho = newobj.NguoiNhanKho;
            if (newobj.ThoiGian != null) obj.ThoiGian = newobj.ThoiGian;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            QuanLyLoHang obj = db.QuanLyLoHangs.Where(o => o.Id == id).SingleOrDefault();
            db.QuanLyLoHangs.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}