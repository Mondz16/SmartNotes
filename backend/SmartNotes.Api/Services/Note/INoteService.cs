using Microsoft.AspNetCore.Components.Web;

public interface INoteService
{
    Task<IEnumerable<Note>> GetNotesAsync(int userId);
    Task<Note> CreateNoteAsync(int userId, string title, string conten);
}