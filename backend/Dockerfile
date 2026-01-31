# 1️⃣ Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5164

# 2️⃣ Build image
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# 3️⃣ Copy solution + project files FIRST
COPY SmartNotes.Api/SmartNotes.Api.csproj SmartNotes.Api/

# 4️⃣ Restore dependencies
RUN dotnet restore SmartNotes.Api/SmartNotes.Api.csproj

# 5️⃣ Copy everything else
COPY . .

# 6️⃣ Publish
RUN dotnet publish SmartNotes.Api/SmartNotes.Api.csproj -c Release -o /app/publish

# 7️⃣ Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SmartNotes.Api.dll"]
