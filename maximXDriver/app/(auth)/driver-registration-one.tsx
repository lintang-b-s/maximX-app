import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Dropdown from "@/components/Dropdown";
import { carColorIcons, carColors, carMakeDummy, carModels } from "@/constants";
import DropdownBottomSheet from "@/components/DropdownBottomSheet";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const ShowDropDownBottomSheet = ({
  dataOrigin,
  data,
  setData,
  setState,
  setShow,
  dataIcon,
  show,
}: {
  dataOrigin: string[];
  data: string[];
  setData: (value: React.SetStateAction<string[]>) => void;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setShow: () => void;
  dataIcon?: any;
  show: boolean;
}) => {
  const handleFilter = (searchTerm: string) => {
    if (searchTerm !== "") {
      setData(
        dataOrigin.filter((make) =>
          make.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setData(dataOrigin);
    }
  };

  return (
    <DropdownBottomSheet
      handleFilter={handleFilter}
      data={data}
      setData={setState}
      setShow={setShow}
      dataIcon={dataIcon}
      open={show}
    />
  );
};

const DriverRegistrationOne = () => {
  const { bottom, top } = useSafeAreaInsets();
  // car make
  const [make, setMake] = useState("Audi");
  const [carMakes, setCarMakes] = useState(carMakeDummy);

  const [showType, setShowType] = useState("");

  // model

  const [model, setModel] = useState("Model 1");
  const [models, setModels] = useState(carModels);

  // color
  const [color, setColor] = useState("white");
  const [colors, setColors] = useState(carColors);

  // year
  const [year, setYear] = useState("2022");

  const [plate, setPlate] = useState("");

  const showDropDown = (tipe: string) => {
    switch (tipe) {
      case "make":
        return (
          <ShowDropDownBottomSheet
            dataOrigin={carMakeDummy}
            data={carMakes}
            setData={setCarMakes}
            setState={setMake}
            setShow={() => {
              setShowType("");
            }}
            show={showType !== ""}
          />
        );
      case "models":
        return (
          <ShowDropDownBottomSheet
            dataOrigin={carModels}
            data={models}
            setData={setModels}
            setState={setModel}
            setShow={() => {
              setShowType("");
            }}
            show={showType !== ""}
          />
        );
      case "color":
        return (
          <ShowDropDownBottomSheet
            dataOrigin={carColors}
            data={colors}
            setData={setColors}
            setState={setColor}
            setShow={() => {
              setShowType("");
            }}
            dataIcon={carColorIcons}
            show={showType !== ""}
          />
        );
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          marginTop: top,
          marginBottom: bottom,
        }}
      >
        <View className="flex flex-1 items-start px-4  py-2 gap-5  bg-white">
          <Text className="font-RobotoSemiBold text-general-300 text-lg">
            Step 1 of 3
          </Text>

          <Text className="text-3xl font-RobotoBold">Add your vehicle</Text>
          <Text className="text-base text-secondary-200 font-Roboto">
            Your vehicle must be 2005 or newer and at least 4 doors and not
            salvaged.
          </Text>
          <Dropdown
            label="Make"
            setShow={() => {
              if (showType !== "make") {
                setShowType("make");
              } else {
                setShowType("");
              }
            }}
            placeholder={make}
          />
          <Dropdown
            label="Model"
            setShow={() => {
              if (showType !== "models") {
                setShowType("models");
              } else {
                setShowType("");
              }
            }}
            placeholder={model}
          />

          <View className="flex flex-row items-center w-full justify-between gap-3 ">
            <View className="flex gap-2 items-start flex-1">
              <InputField
                label="Year"
                placeholder="e.g. 2014"
                value={year}
                keyboardType="numeric"
                onChangeText={(val) => setYear(val)}
              />
            </View>

            <View className="flex gap-2 items-start flex-1">
              <Dropdown
                label="Color"
                setShow={() => {
                  if (showType !== "color") {
                    setShowType("color");
                  } else {
                    setShowType("");
                  }
                }}
                placeholder={color}
              />
            </View>
          </View>

          <InputField
            label="License Plate Number"
            placeholder="e.g. AD 6969"
            value={plate}
            onChangeText={(val) => setPlate(val)}
          />

          <CustomButton
            title="Continue"
            active={
              make !== "" &&
              model !== "" &&
              year !== "" &&
              color !== "" &&
              plate !== ""
            }
            onPress={() => {
              router.push("/(auth)/driver-registration-two");
            }}
          />
        </View>

        {showType !== "" && showDropDown(showType)}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default DriverRegistrationOne;
