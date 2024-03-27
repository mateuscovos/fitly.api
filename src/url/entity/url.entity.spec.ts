import { ValidationError } from "class-validator";
import { UrlEntity } from "./url.entity";

describe('UrlEntity', () => {
    it('Success: Should successfully create a new URL.', async () => {
        const currentDate = new Date()
        const url = UrlEntity.new('https://foo.com')


        expect(url.hash.length).toBe(6)
        expect(url.redirectTo).toBe('https://foo.com')
        expect(url.disabledAt).toBeUndefined()
        expect(url.createdAt.getTime()).toBeGreaterThanOrEqual(currentDate.getTime())
        expect(url.updatedAt).toBeUndefined()
    });

    it('Success: Should successfully update a URL.', async () => {
        const currentDate = new Date()
        const url = UrlEntity.new('https://foo.com')
        expect(url.hash.length).toBe(6)
        expect(url.redirectTo).toBe('https://foo.com')
        expect(url.disabledAt).toBeUndefined()
        expect(url.createdAt.getTime()).toBeGreaterThanOrEqual(currentDate.getTime())
        expect(url.updatedAt).toBeUndefined()

        const currentDate2 = new Date()
        const [success, error] = await url.changeUrl('https://bar.com')

        expect(success).toBeTruthy()
        expect(error).toBeNull()
        expect(url.hash.length).toBe(6)
        expect(url.redirectTo).toBe('https://bar.com')
        expect(url.disabledAt).toBeUndefined()
        expect(url.createdAt.getTime()).toBeGreaterThanOrEqual(currentDate.getTime())
        expect(url.updatedAt.getTime()).toBeGreaterThanOrEqual(currentDate2.getTime())
    });

    it('Success: Should successfully deactivate a URL.', async () => {
        const currentDate = new Date()
        const url = UrlEntity.new('https://foo.com')
        expect(url.hash.length).toBe(6)
        expect(url.redirectTo).toBe('https://foo.com')
        expect(url.disabledAt).toBeUndefined()
        expect(url.createdAt.getTime()).toBeGreaterThanOrEqual(currentDate.getTime())
        expect(url.updatedAt).toBeUndefined()

        const currentDate2 = new Date()
        const [success, error] = await url.deactivate()

        expect(success).toBeTruthy()
        expect(error).toBeNull()
        expect(url.hash.length).toBe(6)
        expect(url.redirectTo).toBe('https://foo.com')
        expect(url.disabledAt.getTime()).toBeGreaterThanOrEqual(currentDate2.getTime())
        expect(url.createdAt.getTime()).toBeGreaterThanOrEqual(currentDate.getTime())
        expect(url.updatedAt.getTime()).toBeGreaterThanOrEqual(currentDate2.getTime())
    });

    it('Success: Should successfully increase access counter.', async () => {
        const currentDate = new Date()
        const url = UrlEntity.new('https://foo.com')
        expect(url.accessCounter).toBe(0)

        url.increaseCounter()
        url.increaseCounter()

        expect(url.accessCounter).toBe(2)
    });

    it('Error: Should not allow changing a disabled URL.', async () => {
        const url = UrlEntity.new('https://foo.com')

        await url.deactivate()

        const [success, error] = await url.changeUrl('https://bar.com')

        expect(success).toBeFalsy();
        expect(error).toBeInstanceOf(Array<ValidationError>);
        expect(error[0].constraints.IsNotEmpty).toBe('A change to a previously disabled URL is not allowed.');
    });

    it('Error: Should not allow deactivating a URL twice.', async () => {
        const url = UrlEntity.new('https://foo.com')

        const [successFirst, errorFirst] = await url.deactivate()
        const [successSecond, errorSecond] = await url.deactivate()

        expect(successFirst).toBeTruthy();
        expect(errorFirst).toBeNull()

        expect(successSecond).toBeFalsy();
        expect(errorSecond).toBeInstanceOf(Array<ValidationError>);
        expect(errorSecond[0].constraints.IsNotEmpty).toBe('The URL is already disabled.');
    });
});