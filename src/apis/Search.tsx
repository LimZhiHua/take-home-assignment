import axios from "axios";

export const fetchSuggestions = async (searchTerm: string) => {
    const response = await axios.get(
        "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json",
    );
    return response;
};

export const fetchSearchResults = async (searchValue: string) => {
    const response = await axios.get(
        "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
    );
    return response;
};