using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly JwtTokenGenerator _tokenGenerator;

    public AuthService(AppDbContext dbContext, JwtTokenGenerator tokenGenerator){
        _dbContext = dbContext;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<string> RegisterAsync(string email, string password){
        var hash = BCrypt.Net.BCrypt.HashPassword(password);

        var user = new User{
            Email = email,
            PasswordHash = hash
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return _tokenGenerator.Generate(user);
    }

    public async Task<string> LoginAsync(string email, string password){
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if(user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash)){
            throw new Exception("Invalid Credentials");
        }

        return _tokenGenerator.Generate(user);
    }
}