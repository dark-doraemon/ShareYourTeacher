using System;

namespace ShareYourTeacher.Models;

public class DataImage
{
    public int Width { get; set; }
    public int Height { get; set; }
    public List<byte> Data { get; set; }
    public string ColorSpace { get; set; }
}
