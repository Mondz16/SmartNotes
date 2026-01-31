using Microsoft.EntityFrameworkCore;

public class NoteService : INoteService
{
    private readonly AppDbContext _dbContext;
    private readonly TextAnalysisService _textAnalysisService;

    public NoteService(AppDbContext dbContext, TextAnalysisService textAnalysisService){
        _dbContext = dbContext;
        _textAnalysisService = textAnalysisService;
    }

    public async Task<IEnumerable<Note>> GetNotesAsync(int userId)
    {
        return await _dbContext.Notes.Where(n => n.UserId == userId).OrderByDescending(n => n.CreatedAt).ToListAsync();
    }

    public async Task<Note> CreateNoteAsync(int userId, string title, string content)
    {
        var note = new Note
        {
            Title = title,
            Content = content,
            Summary = _textAnalysisService.GenerateSummary(content),
            Tags = _textAnalysisService.ExtractTags(content),
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
        };

        _dbContext.Notes.Add(note);
        await _dbContext.SaveChangesAsync();

        return note;
    }
}