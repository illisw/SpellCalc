---@class AddonEnv
local _addon = select(2, ...);
local _, playerClass = UnitClass("player");
if playerClass ~= "WARLOCK" then
    return;
end

--------------------------------------------------------------------------
-- Player auras
--------------------------------------------------------------------------

-- Amplify Curse
_addon.aurasPlayer[18288] = {
    {
        type = _addon.CONST.EFFECT_TYPE.SPELLMOD_PCT_EFFECT,
        affectSpell = { 33792 },
        value = 50,
    }
};

-- Demonic Sacrifice Succubus
_addon.aurasPlayer[18791] = {
    {
        type = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.SHADOW,
        value = 15,
    }
};

-- Demonic Sacrifice Imp
_addon.aurasPlayer[18789] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.FIRE,
        value = 15,
    }
};

-- Master Demonologist dmg done
_addon.aurasPlayer[23761] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.ALL,
        value = 2,
    }
};
_addon.aurasPlayer[23833] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.ALL,
        value = 4,
    }
};
_addon.aurasPlayer[23834] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.ALL,
        value = 6,
    }
};
_addon.aurasPlayer[23835] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.ALL,
        value = 8,
    }
};
_addon.aurasPlayer[23836] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.ALL,
        value = 10,
    }
};

-- Soul Link
_addon.aurasPlayer[25228] = {
    {
        effect = _addon.CONST.EFFECT_TYPE.SCHOOLMOD_PCT_DAMAGE,
        affectMask = _addon.CONST.SCHOOL_MASK.ALL,
        value = 3,
    }
};
