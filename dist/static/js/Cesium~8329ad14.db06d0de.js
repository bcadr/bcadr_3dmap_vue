(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cesium~8329ad14"],{"28ac":function(n,e,t){"use strict";e["a"]='attribute vec3 startEllipsoidNormal;\nattribute vec3 endEllipsoidNormal;\nattribute vec4 startPositionAndHeight;\nattribute vec4 endPositionAndHeight;\nattribute vec4 startFaceNormalAndVertexCorner;\nattribute vec4 endFaceNormalAndHalfWidth;\nattribute float a_batchId;\n\nuniform mat4 u_modifiedModelView;\nuniform vec2 u_minimumMaximumVectorHeights;\n\nvarying vec4 v_startPlaneEC;\nvarying vec4 v_endPlaneEC;\nvarying vec4 v_rightPlaneEC;\nvarying float v_halfWidth;\nvarying vec3 v_volumeUpEC;\n\nvoid main()\n{\n    // vertex corner IDs\n    //          3-----------7\n    //         /|   left   /|\n    //        / | 1       / |\n    //       2-----------6  5  end\n    //       | /         | /\n    // start |/  right   |/\n    //       0-----------4\n    //\n    float isEnd = floor(startFaceNormalAndVertexCorner.w * 0.251); // 0 for front, 1 for end\n    float isTop = floor(startFaceNormalAndVertexCorner.w * mix(0.51, 0.19, isEnd)); // 0 for bottom, 1 for top\n\n    vec3 forward = endPositionAndHeight.xyz - startPositionAndHeight.xyz;\n    vec3 right = normalize(cross(forward, startEllipsoidNormal));\n\n    vec4 position = vec4(startPositionAndHeight.xyz, 1.0);\n    position.xyz += forward * isEnd;\n\n    v_volumeUpEC = czm_normal * normalize(cross(right, forward));\n\n    // Push for volume height\n    float offset;\n    vec3 ellipsoidNormal = mix(startEllipsoidNormal, endEllipsoidNormal, isEnd);\n\n    // offset height to create volume\n    offset = mix(startPositionAndHeight.w, endPositionAndHeight.w, isEnd);\n    offset = mix(u_minimumMaximumVectorHeights.y, u_minimumMaximumVectorHeights.x, isTop) - offset;\n    position.xyz += offset * ellipsoidNormal;\n\n    // move from RTC to EC\n    position = u_modifiedModelView * position;\n    right = czm_normal * right;\n\n    // Push for width in a direction that is in the start or end plane and in a plane with right\n    // N = normalEC ("right-facing" direction for push)\n    // R = right\n    // p = angle between N and R\n    // w = distance to push along R if R == N\n    // d = distance to push along N\n    //\n    //   N   R\n    //  {  p| }      * cos(p) = dot(N, R) = w / d\n    //  d  |  |w    * d = w / dot(N, R)\n    //    { | }\n    //       o---------- polyline segment ----\x3e\n    //\n    vec3 scratchNormal = mix(-startFaceNormalAndVertexCorner.xyz, endFaceNormalAndHalfWidth.xyz, isEnd);\n    scratchNormal = cross(scratchNormal, mix(startEllipsoidNormal, endEllipsoidNormal, isEnd));\n    vec3 miterPushNormal = czm_normal * normalize(scratchNormal);\n\n    offset = 2.0 * endFaceNormalAndHalfWidth.w * max(0.0, czm_metersPerPixel(position)); // offset = widthEC\n    offset = offset / dot(miterPushNormal, right);\n    position.xyz += miterPushNormal * (offset * sign(0.5 - mod(startFaceNormalAndVertexCorner.w, 2.0)));\n\n    gl_Position = czm_depthClamp(czm_projection * position);\n\n    position = u_modifiedModelView * vec4(startPositionAndHeight.xyz, 1.0);\n    vec3 startNormalEC = czm_normal * startFaceNormalAndVertexCorner.xyz;\n    v_startPlaneEC = vec4(startNormalEC, -dot(startNormalEC, position.xyz));\n    v_rightPlaneEC = vec4(right, -dot(right, position.xyz));\n\n    position = u_modifiedModelView * vec4(endPositionAndHeight.xyz, 1.0);\n    vec3 endNormalEC = czm_normal * endFaceNormalAndHalfWidth.xyz;\n    v_endPlaneEC = vec4(endNormalEC, -dot(endNormalEC, position.xyz));\n    v_halfWidth = endFaceNormalAndHalfWidth.w;\n}\n'},3225:function(n,e,t){"use strict";e["a"]="attribute vec4 position;\nattribute vec2 textureCoordinates;\n\nvarying vec2 v_textureCoordinates;\n\nvoid main() \n{\n    gl_Position = position;\n    v_textureCoordinates = textureCoordinates;\n}\n"},"3e7b":function(n,e,t){"use strict";e["a"]="#ifdef GL_EXT_frag_depth\n#extension GL_EXT_frag_depth : enable\n#endif\n\nvarying vec4 v_startPlaneEC;\nvarying vec4 v_endPlaneEC;\nvarying vec4 v_rightPlaneEC;\nvarying float v_halfWidth;\nvarying vec3 v_volumeUpEC;\n\nuniform vec4 u_highlightColor;\nvoid main()\n{\n    float logDepthOrDepth = czm_branchFreeTernary(czm_sceneMode == czm_sceneMode2D, gl_FragCoord.z, czm_unpackDepth(texture2D(czm_globeDepthTexture, gl_FragCoord.xy / czm_viewport.zw)));\n\n    // Discard for sky\n    if (logDepthOrDepth == 0.0) {\n#ifdef DEBUG_SHOW_VOLUME\n        gl_FragColor = vec4(0.0, 0.0, 1.0, 0.5);\n        return;\n#else // DEBUG_SHOW_VOLUME\n        discard;\n#endif // DEBUG_SHOW_VOLUME\n    }\n\n    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, logDepthOrDepth);\n    eyeCoordinate /= eyeCoordinate.w;\n\n    float halfMaxWidth = v_halfWidth * czm_metersPerPixel(eyeCoordinate);\n\n    // Expand halfMaxWidth if direction to camera is almost perpendicular with the volume's up direction\n    halfMaxWidth += halfMaxWidth * (1.0 - dot(-normalize(eyeCoordinate.xyz), v_volumeUpEC));\n\n    // Check distance of the eye coordinate against the right-facing plane\n    float widthwiseDistance = czm_planeDistance(v_rightPlaneEC, eyeCoordinate.xyz);\n\n    // Check eye coordinate against the mitering planes\n    float distanceFromStart = czm_planeDistance(v_startPlaneEC, eyeCoordinate.xyz);\n    float distanceFromEnd = czm_planeDistance(v_endPlaneEC, eyeCoordinate.xyz);\n\n    if (abs(widthwiseDistance) > halfMaxWidth || distanceFromStart < 0.0 || distanceFromEnd < 0.0) {\n#ifdef DEBUG_SHOW_VOLUME\n        gl_FragColor = vec4(logDepthOrDepth, 0.0, 0.0, 0.5);\n        return;\n#else // DEBUG_SHOW_VOLUME\n        discard;\n#endif // DEBUG_SHOW_VOLUME\n    }\n    gl_FragColor = u_highlightColor;\n\n    czm_writeDepthClamp();\n}\n"},"4bec":function(n,e,t){"use strict";e["a"]="\nvarying vec2 v_textureCoordinates;\n\nvoid main()\n{\n    czm_materialInput materialInput;\n    \n    materialInput.s = v_textureCoordinates.s;\n    materialInput.st = v_textureCoordinates;\n    materialInput.str = vec3(v_textureCoordinates, 0.0);\n    materialInput.normalEC = vec3(0.0, 0.0, -1.0);\n    \n    czm_material material = czm_getMaterial(materialInput);\n\n    gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n}\n"},"8fa0":function(n,e,t){"use strict";e["a"]="attribute vec3 position;\nattribute float a_batchId;\n\nuniform mat4 u_modifiedModelViewProjection;\n\nvoid main()\n{\n    gl_Position = czm_depthClamp(u_modifiedModelViewProjection * vec4(position, 1.0));\n}\n"},"95fe":function(n,e,t){"use strict";e["a"]="attribute vec4 currentPosition;\nattribute vec4 previousPosition;\nattribute vec4 nextPosition;\nattribute vec2 expandAndWidth;\nattribute float a_batchId;\n\nuniform mat4 u_modifiedModelView;\n\nvoid main()\n{\n    float expandDir = expandAndWidth.x;\n    float width = abs(expandAndWidth.y) + 0.5;\n    bool usePrev = expandAndWidth.y < 0.0;\n\n    vec4 p = u_modifiedModelView * currentPosition;\n    vec4 prev = u_modifiedModelView * previousPosition;\n    vec4 next = u_modifiedModelView * nextPosition;\n\n    float angle;\n    vec4 positionWC = getPolylineWindowCoordinatesEC(p, prev, next, expandDir, width, usePrev, angle);\n    gl_Position = czm_viewportOrthographic * positionWC;\n}\n"}}]);