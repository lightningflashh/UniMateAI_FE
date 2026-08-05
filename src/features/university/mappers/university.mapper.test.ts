import { toUniversityFormValues } from '@/features/university/mappers/university.mapper'

describe('toUniversityFormValues', () => {
  it('should convert nullable values to empty string', () => {
    const university = {
      id: '1',
      name: 'HCMUTE',
      shortName: 'UTE',
      code: 'UTE',
      province: 'HCM',
      address: 'Vo Van Ngan',
      website: null,
      logoUrl: null,
      description: null,
      createdAt: '',
      updatedAt: '',
    }

    expect(
      toUniversityFormValues(university),
    ).toEqual({
      name: 'HCMUTE',
      shortName: 'UTE',
      code: 'UTE',
      province: 'HCM',
      address: 'Vo Van Ngan',
      website: '',
      description: '',
    })
  })
})