const characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateHash = (): string => Array.from({ length: 6 }).reduce((acc: string) =>  acc + characters.charAt(Math.floor(Math.random() * characters.length)), '') as string