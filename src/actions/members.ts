import { IFilters } from 'src/types/filtets';
import { IGetMembers, IMember } from 'src/types/members';
import { filtersToQuery } from 'src/utils/filters';

const getAllMembers = async (
  filters: IFilters
): Promise<IGetMembers | undefined> => {
  try {
    const query = filtersToQuery(filters);
    const response: Response = await fetch(`/api/members/${query}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: IGetMembers = await response.json();
    return data;
  } catch (exception) {
    console.log(exception);
    return;
  }
};

export { getAllMembers };
