import conn from '../config/conn';

interface ICountry {
    title:string,
    continents:[string],
    capital:[string],
    population:number,
    flag:string
}

const countrySchema = new conn.Schema<ICountry>({
    title: {
        type: String,
        required: true
    },
    continents: {
        type: [String],
        required: true
    },
    capital: {
        type: [String],
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    flag: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Country = conn.model<ICountry>("Country", countrySchema);

export default Country;