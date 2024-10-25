import { 
    AccessAlarm, 
    Lock, 
    Mail, 
    Map, 
    Accessibility, 
    AccountBalance, 
    AccountBalanceWallet, 
    AddCircle, 
    AddShoppingCart, 
    AirplanemodeActive, 
    Alarm, 
    Archive, 
    ArrowBack, 
    ArrowDropDown, 
    ArrowDropUp, 
    ArrowForward, 
    Assignment, 
    AttachFile, 
    Audiotrack, 
    Backup, 
    BeachAccess, 
    Book, 
    Bookmark, 
    Build, 
    Call, 
    Camera, 
    Chat, 
    Clear, 
    Cloud, 
    Compare, 
    Create, 
    Crop, 
    Dashboard, 
    Delete, 
    DensitySmall, 
    Done, 
    Edit, 
    Email, 
    ExitToApp, 
    ExpandLess, 
    ExpandMore, 
    Favorite, 
    FileCopy, 
    FilterList, 
    Fingerprint, 
    Flag, 
    GetApp, 
    Group, 
    Help, 
    Home, 
    HomeRepairService, 
    Info, 
    KeyboardArrowDown, 
    KeyboardArrowRight, 
    Language, 
    Laptop, 
    Lightbulb, 
    ListAlt, 
    LocalOffer, 
    Menu, 
    Mood, 
    MoreHoriz, 
    MoreVert, 
    Notifications, 
    People, 
    Person, 
    PersonAdd, 
    Pets, 
    Photo, 
    Place, 
    Print, 
    Receipt, 
    Search, 
    Security, 
    SentimentSatisfied, 
    Settings, 
    Share, 
    ShoppingBasket, 
    ShoppingCart, 
    Shower, 
    SignalCellularAlt, 
    SportsSoccer, 
    Star, 
    Subscriptions, 
    SwitchAccount, 
    TextFields, 
    ThumbUp, 
    Today, 
    TravelExplore, 
    TrendingUp, 
    Tune, 
    Update, 
    Visibility, 
    VolumeUp, 
    Wallet, 
    Warning, 
    WatchLater, 
    Wifi, 
    Work, 
    WorkOff, 
    ZoomIn, 
    ZoomOut, 
    LibraryBooks, 
    MenuBook } from "@mui/icons-material";
import React from "react";

export const getIconComponent = (
    iconName: string,
    textColor?: string,
    fontSize?: string
): JSX.Element => {
    const defaultFontSize = "27px";
    const defaultTextColor = "text-orange-600";

    const iconProps = {
        sx: {fontSize: fontSize || defaultFontSize},
        className: `${defaultTextColor} ${ textColor || ""}`.trim(),
    };

    switch(iconName){
        case "AccountBalance":
            return <AccountBalance {...iconProps} />;
        case "AccountBalanceWallet":
            return <AccountBalanceWallet {...iconProps} />;
        case "AddShoppingCart":
            return <AddShoppingCart {...iconProps} />;
        case "AccessAlarm":
            return <AccessAlarm {...iconProps} />;
        case "Accessibility":
            return <Accessibility {...iconProps} />;
        case "AirplanemodeActive":
            return <AirplanemodeActive {...iconProps} />;
        case "Alarm":
            return <Alarm {...iconProps} />;
        case "Archive":
            return <Archive {...iconProps} />;
        case "ArrowBack":
            return <ArrowBack {...iconProps} />;
        case "ArrowForward":
            return <ArrowForward {...iconProps} />;
        case "Assignment":
            return <Assignment {...iconProps} />;
        case "AttachFile":
            return <AttachFile {...iconProps} />;
        case "Audiotrack":
            return <Audiotrack {...iconProps} />;
        case "BeachAccess":
            return <BeachAccess {...iconProps} />;
        case "Book":
            return <Book {...iconProps} />;
        case "Bookmark":
            return <Bookmark {...iconProps} />;
        case "Build":
            return <Build {...iconProps} />;
        case "Call":
            return <Call {...iconProps} />;
        case "Camera":
            return <Camera {...iconProps} />;
        case "Chat":
            return <Chat {...iconProps} />;
        case "Clear":
            return <Clear {...iconProps} />;
        case "Cloud":
            return <Cloud {...iconProps} />;
        case "Compare":
            return <Compare {...iconProps} />;
        case "Create":
            return <Create {...iconProps} />;
        case "Crop":
            return <Crop {...iconProps} />;
        case "Dashboard":
            return <Dashboard {...iconProps} />;
        case "Delete":
            return <Delete {...iconProps} />;
        case "Done":
            return <Done {...iconProps} />;
        case "Edit":
            return <Edit {...iconProps} />;
        case "Email":
            return <Email {...iconProps} />;
        case "ExitToApp":
            return <ExitToApp {...iconProps} />;
        case "ExpandMore":
            return <ExpandMore {...iconProps} />;
        case "Favorite":
            return <Favorite {...iconProps} />;
        case "FileCopy":
            return <FileCopy {...iconProps} />;
        case "FilterList":
            return <FilterList {...iconProps} />;
        case "Flag":
            return <Flag {...iconProps} />;
        case "GetApp":
            return <GetApp {...iconProps} />;
        case "Home":
            return <Home {...iconProps} />;
        case "Info":
            return <Info {...iconProps} />;
        case "Language":
            return <Language {...iconProps} />;
        case "Laptop":
            return <Laptop {...iconProps} />;
        case "LocalOffer":
            return <LocalOffer {...iconProps} />;
        case "Lock":
            return <Lock {...iconProps} />;
        case "Mail":
            return <Mail {...iconProps} />;
        case "Map":
            return <Map {...iconProps} />;
        case "Menu":
            return <Menu {...iconProps} />;
        case "MoreVert":
            return <MoreVert {...iconProps} />;
        case "Notifications":
            return <Notifications {...iconProps} />;
        case "People":
            return <People {...iconProps} />;
        case "Person":
            return <Person {...iconProps} />;
        case "Photo":
            return <Photo {...iconProps} />;
        case "Print":
            return <Print {...iconProps} />;
        case "Receipt":
            return <Receipt {...iconProps} />;
        case "Search":
            return <Search {...iconProps} />;
        case "Settings":
            return <Settings {...iconProps} />;
        case "Share":
            return <Share {...iconProps} />;
        case "ShoppingCart":
            return <ShoppingCart {...iconProps} />;
        case "Star":
            return <Star {...iconProps} />;
        case "TextFields":
            return <TextFields {...iconProps} />;
        case "ThumbUp":
            return <ThumbUp {...iconProps} />;
        case "Today":
            return <Today {...iconProps} />;
        case "Tune":
            return <Tune {...iconProps} />;
        case "Update":
            return <Update {...iconProps} />;
        case "Visibility":
            return <Visibility {...iconProps} />;
        case "VolumeUp":
            return <VolumeUp {...iconProps} />;
        case "Warning":
            return <Warning {...iconProps} />;
        case "WatchLater":
            return <WatchLater {...iconProps} />;
        case "Wifi":
            return <Wifi {...iconProps} />;
        case "ZoomIn":
            return <ZoomIn {...iconProps} />;
        case "ZoomOut":
            return <ZoomOut {...iconProps} />;
        case "ArrowDropDown":
            return <ArrowDropDown {...iconProps} />;
        case "ArrowDropUp":
            return <ArrowDropUp {...iconProps} />;
        case "HomeRepairService":
            return <HomeRepairService {...iconProps} />;
        case "Lightbulb":
            return <Lightbulb {...iconProps} />;
        case "Mood":
            return <Mood {...iconProps} />;
        case "Pets":
            return <Pets {...iconProps} />;
        case "Place":
            return <Place {...iconProps} />;
        case "Security":
            return <Security {...iconProps} />;
        case "SentimentSatisfied":
            return <SentimentSatisfied {...iconProps} />;
        case "Shower":
            return <Shower {...iconProps} />;
        case "Subscriptions":
            return <Subscriptions {...iconProps} />;
        case "SwitchAccount":
            return <SwitchAccount {...iconProps} />;
        case "TrendingUp":
            return <TrendingUp {...iconProps} />;
        case "Wallet":
            return <Wallet {...iconProps} />;
        case "Work":
            return <Work {...iconProps} />;
        case "ExpandLess":
            return <ExpandLess {...iconProps} />;
        case "MoreHoriz":
            return <MoreHoriz {...iconProps} />;
        case "SignalCellularAlt":
            return <SignalCellularAlt {...iconProps} />;
        case "SportsSoccer":
            return <SportsSoccer {...iconProps} />;
        case "TravelExplore":
            return <TravelExplore {...iconProps} />;
        case "WorkOff":
            return <WorkOff {...iconProps} />;
        case "AddCircle":
            return <AddCircle {...iconProps} />;
        case "Backup":
            return <Backup {...iconProps} />;
        case "Fingerprint":
            return <Fingerprint {...iconProps} />;
        case "Group":
            return <Group {...iconProps} />;
        case "KeyboardArrowDown":
            return <KeyboardArrowDown {...iconProps} />;
        case "KeyboardArrowRight":
            return <KeyboardArrowRight {...iconProps} />;
        case "ListAlt":
            return <ListAlt {...iconProps} />;
        case "PersonAdd":
            return <PersonAdd {...iconProps} />;
        case "ShoppingBasket":
            return <ShoppingBasket {...iconProps} />;
        case "LibraryBooks":
            return <LibraryBooks {...iconProps} />;
        case "MenuBook":
            return <MenuBook {...iconProps} />;
        default:
            console.warn(`Icon "${iconName}" not found in MUI icons`);
            return <Help {...iconProps} />;
    }
}