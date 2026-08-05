import type { UniversityFormValues } from '@/features/university/schemas/university.schema'
import type { University } from '@/types/university.type'

export function toUniversityFormValues(
  university: University,
): UniversityFormValues {
  return {
    name: university.name,
    shortName: university.shortName,
    code: university.code,
    province: university.province,
    address: university.address,
    website: university.website ?? '',
    description:
      university.description ?? '',
  }
}