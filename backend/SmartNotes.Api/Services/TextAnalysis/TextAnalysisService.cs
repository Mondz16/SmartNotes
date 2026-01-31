public class TextAnalysisService 
{
    public string GenerateSummary(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return "";
        
        var parts = text.Split('.');
        var summary = string.Join(". ", parts.Take(2));
        return string.IsNullOrWhiteSpace(summary) ? text.Substring(0, Math.Min(100, text.Length)) : summary + ".";
    }

    public string ExtractTags(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return "";
        
        return string.Join(", ", text.ToLower().Split(' ').Where(w => w.Length > 4).Distinct().Take(5));
    }
}