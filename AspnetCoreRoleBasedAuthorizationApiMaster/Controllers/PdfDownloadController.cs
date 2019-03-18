using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class pdfController : ControllerBase
    {
        // GET: api/pdf
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        [AllowAnonymous]
        [HttpGet("{path}/{pageNum}")]
        public IActionResult Get(string path, string pageNum)
        {
            var fileURL = @"D:\Projects\VIP-Alef\Client\VIP-Alef\src\documents\" + pageNum; // + ".pdf";
            var stream = new FileStream(fileURL, FileMode.Open);
            var file = File(stream, "application/pdf");
            //Response.Headers.Add("Content-Disposition", $"inline; filename=" + fileURL);
            return File(stream, "application/pdf", pageNum);
        }

    }
}
