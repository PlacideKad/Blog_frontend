import {describe , it , expect} from 'vitest';
import {removeFromCloudinary} from './removeCloudinaryLink';

describe('removeFromCloudinary',async ()=>{
    it('Should call the backend to delete a picture from cloudinary}',async ()=>{
        expect(await removeFromCloudinary('machin')).toBe(true)
    })
})