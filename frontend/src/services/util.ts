import type {Levels} from "../Components/MainGrid/Game"
// URL till postman
const Base_URL = "http://localhost:5000"

// Remove number function
// Input: row, column and current level
// Output: Boolean, True GOOOD
export async function remove_number_req (row: number, column: number, dif: Levels) : Promise<boolean> {

    // Det som skickas till Python API:t
    const parameters = new URLSearchParams({
        row : String(row),
        col : String(column),
        dif : String(dif)
    });

    // API anrop
    const anrop = await fetch(`${Base_URL}/remove_number?` + parameters, {
        method: "POST",
    });
    
    // Output från python Server funktionen
    const text = (await anrop.text()).trim()
    return text === "True"
}

// add_number function
// Input: row, column, value and level 
// Output: "True" or "False" (True is GOOOOD)
export async function add_number_req (row: number, column: number, value: number, dif: Levels): Promise<boolean> {
    // Det som skickas till Python API:t
    const parameters = new URLSearchParams({
        row : String(row),
        col : String(column),
        value : String(value),
        dif : String(dif)
    })

    // API anrop
    const anrop = await fetch(`${Base_URL}/add_number?` + parameters, {
        method: "POST"
    });

    // Output från Python Server funktionen 
    const text = (await anrop.text()).trim()
    return text === "True"
}
// Input : row, column, level
// Output: value 
export async function give_hint_req (row: number, column: number, dif: Levels): Promise<String> {

    const parameters = new URLSearchParams({
        row : String(row),
        col : String(column),
        dif : String(dif)
    })

    // API anrop
    const anrop = await fetch(`${Base_URL}/give_hint?` + parameters, {
        method: "POST"
    });

    const val = (await anrop.text()).trim()
    return val; 


}