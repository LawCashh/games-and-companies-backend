const GameSchema = `
    type Game {
        id: String,
        title: String,
        releaseYear: Int,
        companyId: String,
        company: Company
    }
`;

export default GameSchema;