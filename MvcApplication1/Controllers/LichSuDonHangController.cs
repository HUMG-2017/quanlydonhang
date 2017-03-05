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
    public class LichSuDonHangController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        // GET api/<controller>
        [JwtAuthentication]
        public IEnumerable<LichSuDonHang> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<LichSuDonHang> lst = (from table in db.LichSuDonHangs
                                           select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
            else
            {
                LichSuDonHang obj = JsonConvert.DeserializeObject<LichSuDonHang>(filter);
                List<LichSuDonHang> lst = (from table in db.LichSuDonHangs
                                           where
                                               (obj.IdDonHang == null || obj.IdDonHang == table.IdDonHang) &&
                                               (obj.KhoHangGui == null || obj.KhoHangGui == table.KhoHangGui) &&
                                               (obj.KhoHangNhan == null || obj.KhoHangNhan == table.KhoHangNhan) &&
                                               (obj.NguoiGui == null || obj.NguoiGui == table.NguoiGui) &&
                                               (obj.NguoiNhan == null || obj.NguoiNhan == table.NguoiNhan) &&
                                               (obj.TaiKhoanKhach == null || obj.TaiKhoanKhach == table.TaiKhoanKhach) &&
                                               (obj.ThoiDiemXuLy == null || obj.ThoiDiemXuLy == table.ThoiDiemXuLy) &&
                                               (obj.TrangThai == null || obj.TrangThai == table.TrangThai)
                                           select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
        }

        // GET api/<controller>/5
        public List<LichSuDonHang> Get(int id)
        {
            List<LichSuDonHang> lst = db.LichSuDonHangs.Where(o => o.Id == id).ToList();
            return lst;
            //string json = JsonConvert.SerializeObject(lst);
            //return json;
        }

        // POST api/<controller>
        public void Post([FromBody]LichSuDonHang value)
        {
            LichSuDonHang newobj = value;// (LichSuDonHang)JsonConvert.DeserializeObject(value);
            db.LichSuDonHangs.InsertOnSubmit(newobj);
            db.SubmitChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]LichSuDonHang value)
        {
            LichSuDonHang obj = db.LichSuDonHangs.Where(o => o.Id == id).SingleOrDefault();
            LichSuDonHang newobj = value;// JsonConvert.DeserializeObject<LichSuDonHang>(value);
            if (newobj.IdDonHang != null) obj.IdDonHang = newobj.IdDonHang;
            if (newobj.KhoHangGui != null) obj.KhoHangGui = newobj.KhoHangGui;
            if (newobj.KhoHangNhan != null) obj.KhoHangNhan = newobj.KhoHangNhan;
            if (newobj.NguoiGui != null) obj.NguoiGui = newobj.NguoiGui;
            if (newobj.NguoiNhan != null) obj.NguoiNhan = newobj.NguoiNhan;
            if (newobj.TaiKhoanKhach != null) obj.TaiKhoanKhach = newobj.TaiKhoanKhach;
            if (newobj.ThoiDiemXuLy != null) obj.ThoiDiemXuLy = newobj.ThoiDiemXuLy;
            if (newobj.TrangThai != null) obj.TrangThai = newobj.TrangThai;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            LichSuDonHang obj = db.LichSuDonHangs.Where(o => o.Id == id).SingleOrDefault();
            db.LichSuDonHangs.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}