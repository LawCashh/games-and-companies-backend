const CompanySchema = `
    type Company {
        id: String,
        title: String,
        numOfEmployees: Int,
        games: [Game]!
    }
`;

export default CompanySchema;