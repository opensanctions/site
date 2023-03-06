import { redirect } from 'next/navigation';
import { MEETING_LINK } from '../../lib/constants';


export default async function Meeting() {
  redirect(MEETING_LINK);
  return '<p>Meeting link</p>';
}
