import React, { useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  SwapOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";

const CustomImagePreview = ({ images, viewMode, children }) => {
  const [current, setCurrent] = useState(0);

  return (
    <Image.PreviewGroup
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: {
              onActive,
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          }
        ) => (
          <Space
            size={12}
            className="toolbar-wrapper bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl border border-white/10"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="group relative">
              <LeftOutlined
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={() => onActive?.(-1)}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Previous
              </div>
            </div>

            <div className="group relative">
              <RightOutlined
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={() => onActive?.(1)}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Next
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1"></div>

            <div className="group relative">
              <SwapOutlined
                rotate={90}
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={onFlipY}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Flip Vertical
              </div>
            </div>

            <div className="group relative">
              <SwapOutlined
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={onFlipX}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Flip Horizontal
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1"></div>

            <div className="group relative">
              <RotateLeftOutlined
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={onRotateLeft}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Rotate Left
              </div>
            </div>

            <div className="group relative">
              <RotateRightOutlined
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={onRotateRight}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Rotate Right
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1"></div>

            <div className="group relative">
              <ZoomOutOutlined
                className={`text-2xl transition-all duration-200 p-2 rounded-lg active:scale-95 ${
                  scale === 1
                    ? "text-white/30 cursor-not-allowed"
                    : "text-white/90 hover:text-white hover:scale-110 hover:bg-white/10 cursor-pointer"
                }`}
                disabled={scale === 1}
                onClick={onZoomOut}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Zoom Out
              </div>
            </div>

            <div className="group relative">
              <ZoomInOutlined
                className={`text-2xl transition-all duration-200 p-2 rounded-lg active:scale-95 ${
                  scale === 50
                    ? "text-white/30 cursor-not-allowed"
                    : "text-white/90 hover:text-white hover:scale-110 hover:bg-white/10 cursor-pointer"
                }`}
                disabled={scale === 50}
                onClick={onZoomIn}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Zoom In
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1"></div>

            <div className="group relative">
              <UndoOutlined
                className="text-white/90 text-xl hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10 active:scale-95"
                onClick={onReset}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Reset
              </div>
            </div>
          </Space>
        ),
        onChange: (index) => {
          setCurrent(index);
        },
      }}
    >
      {children}
    </Image.PreviewGroup>
  );
};

export default CustomImagePreview;
