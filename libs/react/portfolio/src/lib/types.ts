/** the moral code of a personnel */
type Code = 'white' | 'black' | 'grey';
/** analagous to a pokemon type */
type Class = 'tech' | 'business' | 'legal';
/** 
 * 'transferable' skill points can be used to
 * boost any card Class 
 * */
type SkillPointClass = Class | 'transferable';
/** a liaility's target entity type */
type Risk = 'personnel' | 'team' | 'field';
/** states that can affect personnel. think pokémon */
type Status = 'poached' | 'jailed' | 'burn-out'
  | 'death' | 'canceled' | 'normal';
/** assets are required to stay in play and fund personnel */
type AssetType = 'stock' | 'cash-on-hand' | 'bond' | 'tangible';

type Card = 
  | Personnel
  | Liability
  | SkillPoint
  | Asset
;

/** the field is made up of n teams */
type Field = Team[];
type Team = {
  personnel: Personnel[],
  assets: Asset[],
  /** 
   * the current quoted price 
   * for this company's NASDAQ ticker.
   * determines the value of a 'stock'
   * Asset
  */
  quote: number,
}

/**
 * the game is won when
 * only one team is operational
 */
const isOperational = (team: Team) => {
  const { assets } = team;
  return assets
    .filter(a => a.type['cash-on-hand'])
    .length > 0;
}

const endGame = (field: Field) => {
  return field.filter(isOperational).length === 1;
}

interface Personnel {
  code: Code,
  class: Class,
  status: Status,
  skillPoints: SkillPoint[],
  type: 'personnel',
}
        
interface SkillPoint {
  class: SkillPointClass,
  type: 'skill-point',
}

/**
 * to maintain personnel,
 * you must discard asset cards equal to
 * their total skill points for each turn.
 */
interface Asset {
  type: 'asset',
  class: SkillPointClass,
  assetType: AssetType,
}

/**
 * the bread and butter of the game. liabilities played
 * prey to the disposition of personnel, teams, and the field.
 * 
 * for instance, a black code personnel maybe an effective business
 * personnel, but black code liabilities such as a public oversight
 * cause your stock to tank.
 * 
 * a team made of most mostly black code cards without
 * high skillpoints in legal may be especially vulnerable
 * to money laundering, embezzlement, or audits (consider that a 
 * a white coded legal personnel may help guard against this)
 * 
 * white coded cards are not affected by black liabilites and 
 * vice versa. grey liabilities affect all codes.
 * 
 * some liabilities are positive, but become a liability
 * for the opposite code. for instance, a tech scholarship
 * is a white liability code that black codes do not benefit from,
 * but white and grey codes do. this means it is, in effect, a liability for
 * black codes, but represented in game form as a white coded card.
 */
type Liability = 
  | PersonnelLiability
  | TeamLiability
  | FieldLiability
;

interface PersonnelLiability {
  entity: Personnel,
  code: Code,
  class: Class,
  risk: 'personnel',
  type: 'liability',
}

interface TeamLiability {
  entity: Team,
  code: Code,
  class: Class,
  risk: 'team',
  type: 'liability',
}

interface FieldLiability {
  entity: Field,
  code: Code,
  class: Class,
  risk: 'field',
  type: 'liability',
}