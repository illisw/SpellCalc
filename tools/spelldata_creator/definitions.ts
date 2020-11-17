const enum EFFECT_TYPE {
    SPELL_EFFECT_HEAL = 10,
    SPELL_EFFECT_APPLY_AURA = 6,
    SPELL_EFFECT_PERSISTENT_AREA_AURA = 27,
    SPELL_EFFECT_SCRIPT_EFFECT = 77,
    SPELL_EFFECT_SCHOOL_DAMAGE = 2,
    SPELL_EFFECT_HEALTH_LEECH = 9,
    SPELL_EFFECT_SUMMON_TOTEM_SLOT_CLASSIC = 28, // Seems like all totems share this now
    SPELL_EFFECT_WEAPON_PERCENT_DAMAGE = 31, // if E1 then modify E0!
    SPELL_EFFECT_ATTACK = 78,
    SPELL_EFFECT_WEAPON_DAMAGE = 58,
    SPELL_EFFECT_APPLY_AREA_AURA_PARTY = 35
}

const enum AURA_TYPE {
    SPELL_AURA_PERIODIC_DAMAGE = 3,
    SPELL_AURA_DUMMY = 4,
    SPELL_AURA_PERIODIC_HEAL = 8,
    SPELL_AURA_MOD_THREAT = 10,
    SPELL_AURA_MOD_DAMAGE_DONE = 13,
    SPELL_AURA_DAMAGE_SHIELD = 15,
    SPELL_AURA_MOD_RESISTANCE = 22,
    SPELL_AURA_PERIODIC_TRIGGER_SPELL = 23,
    SPELL_AURA_MOD_STAT = 29,
    SPELL_AURA_MOD_SKILL = 30,
    SPELL_AURA_MOD_INCREASE_SPEED = 31,
    SPELL_AURA_MOD_INCREASE_ENERGY = 35,
    SPELL_AURA_PROC_TRIGGER_SPELL = 42,
    SPELL_AURA_MOD_PARRY_PERCENT = 47,
    SPELL_AURA_MOD_DODGE_PERCENT = 49,
    SPELL_AURA_MOD_BLOCK_PERCENT = 51,
    SPELL_AURA_MOD_CRIT_PERCENT = 52,
    SPELL_AURA_PERIODIC_LEECH = 53,
    SPELL_AURA_MOD_HIT_CHANCE = 54,
    SPELL_AURA_MOD_SPELL_HIT_CHANCE = 55,
    SPELL_AURA_MOD_INCREASE_SWIM_SPEED = 58,
    SPELL_AURA_SCHOOL_ABSORB = 69,
    SPELL_AURA_MOD_SPELL_CRIT_CHANCE_SCHOOL = 71,
    SPELL_AURA_MOD_POWER_COST_SCHOOL_PCT = 72,
    SPELL_AURA_MOD_POWER_REGEN = 85,
    SPELL_AURA_MANA_SHIELD = 97,
    SPELL_AURA_MOD_ATTACK_POWER = 99,
    SPELL_AURA_MOD_MELEE_ATTACK_POWER_VERSUS = 102,
    SPELL_AURA_ADD_FLAT_MODIFIER = 107,
    SPELL_AURA_ADD_PCT_MODIFIER = 108,
    SPELL_AURA_ADD_TARGET_TRIGGER = 109,
    SPELL_AURA_OVERRIDE_CLASS_SCRIPTS = 112,
    SPELL_AURA_MOD_MECHANIC_RESISTANCE = 117,
    SPELL_AURA_MOD_TARGET_RESISTANCE = 123,
    SPELL_AURA_MOD_RANGED_ATTACK_POWER = 124,
    SPELL_AURA_MOD_SPEED_ALWAYS = 129,
    SPELL_AURA_MOD_RANGED_ATTACK_POWER_VERSUS = 131,
    SPELL_AURA_MOD_MANA_REGEN_INTERRUPT = 134,
    SPELL_AURA_MOD_HEALING_DONE = 135,
    SPELL_AURA_MOD_SHIELD_BLOCKVALUE = 158,
    SPELL_AURA_MOD_DAMAGE_DONE_VERSUS = 168,
    SPELL_AURA_MOD_CRITICAL_THREAT = 183,
}

const enum DEFENSE_TYPE {
    NONE = 0,
    MAGIC = 1,
    MELEE = 2,
    RANGED = 3
}

const enum SPELL_ATTR0 {
    SPELL_ATTR_IMPOSSIBLE_DODGE_PARRY_BLOCK = 0x200000,
}

const enum SPELL_ATTR1 {
    SPELL_ATTR_EX_CHANNELED1 = 0x4,
    SPELL_ATTR_EX_CHANNELED2 = 0x40,
    SPELL_ATTR_EX_CHANNELED_ANY = 0x44,
}

const enum SCHOOL_MASK {
    NONE	= 0x00,
    PHYSICAL= 0x01,
    HOLY	= 0x02,
    FIRE	= 0x04,
    NATURE	= 0x08,
    FROST	= 0x10,
    SHADOW	= 0x20,
    ARCANE	= 0x40,
}

interface BaseInfo {
    getspellinfoid: number,
    school: number,
    isChannel: boolean,
    isBinary: boolean,
    gcd: number,
    defenseType: DEFENSE_TYPE,
    cantDogeParryBlock: boolean,
    usedWeaponMask: number
}

interface EffectInfo {
    effectType: number,
    auraType?: number
    min: number,
    max: number,
    perLevel: number,
    coef: number,
    forceScaleWithHeal: boolean,
    period: number,
    charges: number,
    weaponCoef: number,
    chainInfo?: {
        chains: number, 
        mult: number
    }
}

const enum PowerType {
    MANA = 0,
    RAGE = 1,
    ENERGY = 3,
}

interface RankInfo {
    spellnamecomment: string,
    spellLevel: number,
    maxLevel: number,
    duration: number,
    baseCost: number,
    effects: EffectInfo[]
}

interface ClassInfo {
    baseInfo: {[index: string]: BaseInfo},
    rankInfo: {[index: number]: RankInfo},
}

const enum ItemClass {
    ITEM_CLASS_CONSUMABLE   = 0,
    ITEM_CLASS_CONTAINER    = 1,
    ITEM_CLASS_WEAPON       = 2,
    ITEM_CLASS_GEM          = 3,
    ITEM_CLASS_ARMOR        = 4,
    ITEM_CLASS_REAGENT      = 5,
    ITEM_CLASS_PROJECTILE   = 6,
    ITEM_CLASS_TRADE_GOODS  = 7,
    ITEM_CLASS_GENERIC      = 8,
    ITEM_CLASS_RECIPE       = 9,
    ITEM_CLASS_MONEY        = 10,
    ITEM_CLASS_QUIVER       = 11,
    ITEM_CLASS_QUEST        = 12,
    ITEM_CLASS_KEY          = 13,
    ITEM_CLASS_PERMANENT    = 14,
    ITEM_CLASS_MISC         = 15
}

const enum ADDON_EFFECT_TYPE {
    SPELL_MOD_PCT_EFFECT = "_addon.EFFECT_TYPE.SPELL_MOD_PCT_EFFECT",
    SPELL_MOD_PCT_DAMAGE = "_addon.EFFECT_TYPE.SPELL_MOD_PCT_DAMAGE",
    MOD_HIT_SPELL = "_addon.EFFECT_TYPE.MOD_HIT_SPELL",
    FSR_REGEN = "_addon.EFFECT_TYPE.FSR_REGEN",
    MOD_CRIT = "_addon.EFFECT_TYPE.MOD_CRIT",
    RESISTANCE_PEN = "_addon.EFFECT_TYPE.RESISTANCE_PEN",
    MAGE_NWR_PROC = "_addon.EFFECT_TYPE.MAGE_NWR_PROC",
    MOD_DURATION = "_addon.EFFECT_TYPE.MOD_DURATION",
    MOD_FLAT_VALUE = "_addon.EFFECT_TYPE.MOD_FLAT_VALUE",
    EARTHFURY_RETURN = "_addon.EFFECT_TYPE.EARTHFURY_RETURN",
    SPELLMOD_GCD = "_addon.EFFECT_TYPE.SPELLMOD_GCD",
    TRIGGER_UPDATE = "_addon.EFFECT_TYPE.TRIGGER_UPDATE",
    SPELLMOD_EFFECT_PAST_FIRST = "_addon.EFFECT_TYPE.SPELLMOD_EFFECT_PAST_FIRST",
    MP5 = "_addon.EFFECT_TYPE.MP5",
    ILLUMINATION = "_addon.EFFECT_TYPE.ILLUMINATION",
    CONDITION_TRIGGER = "_addon.EFFECT_TYPE.CONDITION_TRIGGER",
}