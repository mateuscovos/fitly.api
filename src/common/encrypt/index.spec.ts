import { ValidationError } from "class-validator";
import { generateHash } from ".";

describe('Ecnrypt', () => {
    describe('Hashing', () => {
        it('Success: Should successfully create a hash with 6 characters.', () => {
            for (let i = 0; i <= 50; i++) {
                expect(generateHash().length).toBe(6)
            }
        });
    })
});