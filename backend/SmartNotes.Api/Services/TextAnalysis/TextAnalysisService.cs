public class TextAnalysisService 
{
    public string GenerateSummary(string text)
    {
        // Placeholder implementation
        return string.Join(". ", text.Split('.').Take(2)) + ".";
    }

    public string ExtractTags(string text){
        return string.Join(", ", text.ToLower().Split(' ').Where(w => w.Length > 4).Distinct().Take(5));
    }
}