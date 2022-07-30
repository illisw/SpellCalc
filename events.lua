---@type string
local _addonName = select(1, ...);
---@type AddonEnv
local _addon = select(2, ...);

-- dirty fix to "disable" the addon preventing errors on unsupported classes
-- TODO: Remove when classes are supported
local _, class = UnitClass("player");
if class == "WARRIOR" or class == "ROGUE" or class == "HUNTER" then
    _addon:PrintError("Class not (yet) supported, addon won't work!");
    return;
end

local frame = CreateFrame("Frame");
local handlers = {};

-- These can fire too early causing problems. Delay until entering world.
local afterEnterWorld = {
    ACTIONBAR_SLOT_CHANGED = true,
}

function handlers.ADDON_LOADED(addonName)
    if addonName ~= _addonName then
        return;
    end
	frame:UnregisterEvent("ADDON_LOADED");
    _addon:SetupSettings();
    _addon.events:TogglePowerUpdate(SpellCalc_settings.useCurrentPowerLevel);

    if _addon.spellRankInfo == nil or _addon.talentDataRaw == nil then
		_addon:PrintError(_addonName .. ": No data for this class (yet)! Addon won't work!");
	end
end

function handlers.PLAYER_LOGIN()
    _addon.ActionBarValues:Setup();
    _addon.ScriptEffects.LoadScripts();
    _addon:ApplyPassives();
end

function handlers.PLAYER_ENTERING_WORLD(isLogin, isReload)
    if isLogin or isReload then
        for k, _ in pairs(afterEnterWorld) do
            frame:RegisterEvent(k);
        end
    end
    _addon:FullUpdate();
end

function handlers.UNIT_AURA(unit)
    if unit == "player" then
        _addon:UpdatePlayerAuras();
        _addon:UpdateWeaponEnchants();
        _addon:UpdateManaRegen();
    elseif unit == "target" then
        _addon.Target:UpdateAuras();
    end
end

function handlers.UNIT_STATS(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateStats();
    _addon:UpdateManaRegen();
end

function handlers.CHARACTER_POINTS_CHANGED(gain)
    if gain > -1 then
        return;
    end
    _addon:UpdateTalents();
end

function handlers.ACTIVE_TALENT_GROUP_CHANGED()
    _addon:UpdateTalents();
end

function handlers.SPELL_POWER_CHANGED()
    _addon:UpdateSpellPower();
end

function handlers.PLAYER_DAMAGE_DONE_MODS(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateDmgDoneMods();
end

function handlers.COMBAT_RATING_UPDATE()
    _addon:CombatRatingUpdate();
end

function handlers.UPDATE_INVENTORY_DURABILITY()
    _addon:UpdateItems();
end

function handlers.UNIT_INVENTORY_CHANGED(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateItems();
    _addon:UpdateWeaponRestrictedAuras();
end

function handlers.PLAYER_TARGET_CHANGED()
    _addon.Target:Update();
end

function handlers.ACTIONBAR_SLOT_CHANGED(slot)
    if slot >= 1 and slot <= 120 then
        _addon.ActionBarValues:SlotUpdate(slot)
    end
end

function handlers.UNIT_ATTACK_SPEED(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateAttackSpeeds();
end

function handlers.UNIT_ATTACK(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateWeaponAttack();
end


function handlers.UNIT_DAMAGE(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateAttackDmg();
end

function handlers.UNIT_RANGEDDAMAGE(unit)
    if unit ~= "player" then
        return;
    end
    _addon:UpdateRangedAttackDmg();
end

function handlers.UNIT_POWER_UPDATE(unit, powerType)
    if unit ~= "player" then
        return;
    end
    _addon:UpdatePower(powerType);
end

function handlers.GET_ITEM_INFO_RECEIVED(itemId)
    _addon:UpdateRecievedItemData(itemId);
end

function handlers.GLYPH_ADDED(slot)
    _addon:UpdateGlyphs(slot)
end

function handlers.GLYPH_REMOVED(slot)
    _addon:UpdateGlyphs(slot)
end

function handlers.GLYPH_UPDATED(slot)
    _addon:UpdateGlyphs(slot)
end

function handlers.UNIT_ATTACK_POWER(unit)
    if unit ~= "player" then return end
    _addon:UpdateAttackPower();
end

function handlers.UNIT_RANGED_ATTACK_POWER(unit)
    if unit ~= "player" then return end
    _addon:UpdateAttackPower(true);
end

frame:SetScript( "OnEvent",function(self, event, ...) 
	handlers[event](...);
end)

for k,_ in pairs(handlers) do
    if not afterEnterWorld[k] then
        frame:RegisterEvent(k);
    end
end

_addon.events = {};

--- Toggle power updates via UNIT_POWER_UPDATE
---@param active boolean
function _addon.events:TogglePowerUpdate(active)
    if active then
        frame:RegisterEvent("UNIT_POWER_UPDATE");
    else
        frame:UnregisterEvent("UNIT_POWER_UPDATE");
    end
    _addon:UpdatePower();
end