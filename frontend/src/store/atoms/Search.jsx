import { atom } from "recoil";

export const SearchAtom = atom({
    key: "SearchAtom",
    default: ""
});

export const SearchResultsAtom = atom({
    key: "SearchResultsAtom",
    default: []
})