import Link from "next/link";
import { Model, Values } from "../../lib/ftm";
import { IMatchedEntityDatum, IMatcherFeature } from "../../lib/types";
import { EntityLink } from "../Entity";
import { TypeValues } from "../Property";
import { Numeric } from "../util";
import { DetailPopup } from "../utils/DetailPopup";
import { Badge, Table } from '../wrapped';

type MatcherResultProps = {
  model: Model
  result: IMatchedEntityDatum
  matcher: { [key: string]: IMatcherFeature }
}

export default function MatcherResult({ model, result, matcher }: MatcherResultProps) {
  const entity = model.getEntity(result);
  const topicType = model.getType('topic');
  const topics = entity.getTypeValues(topicType) as Values;
  return (
    <tr>
      <td>
        <>
          <EntityLink entity={entity} />
          {result.match && (
            <>
              {' '}
              <Badge bg="success">match</Badge>
            </>
          )}
        </>
      </td>
      <td>
        <TypeValues type={topicType} values={topics} />
      </td>
      <td className='numeric'><Numeric value={result.score} digits={2} /></td>
      <td className='numeric' width="1%">
        <DetailPopup title="Match score explanation">
          <p>
            For more details about the matcher, including the coefficients
            applied to these feature scores, <Link href="/matcher/">refer to the documentation</Link>.
          </p>
          <Table>
            <thead>
              <tr>
                <th className="numeric">Score</th>
                <th>Feature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.features).map(([feat, score]) => (
                <tr key={feat}>
                  <td className="numeric">
                    <Numeric value={score} digits={2} />
                  </td>
                  <td>
                    <Link href={matcher[feat].url}><code>{feat}</code></Link>
                  </td>
                  <td>
                    {matcher[feat].description}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </DetailPopup>
      </td>
    </tr>
  )
}
