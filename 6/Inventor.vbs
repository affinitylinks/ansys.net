Public Sub SetAttribute()

    Dim SelectSetCt As Integer
    SelectSetCt = ThisApplication.ActiveDocument.SelectSet.Count
    If SelectSetCt < 1 Then
        MsgBox "An entity must be selected."
        Exit Sub
    End If
        
    Dim ObjectColl As ObjectCollection
    Set ObjectColl = ThisApplication.TransientObjects.CreateObjectCollection

    For Ctr = 1 To SelectSetCt Step 1
        Dim oSelectedObject As Object
        Set oSelectedObject = ThisApplication.ActiveDocument.SelectSet.Item(Ctr)
        ObjectColl.Add oSelectedObject
    Next Ctr
        
    Dim AttributeSetName
    Dim AttributeName
    Dim bGotGoodAttrSetName
    Dim bGotGoodAttrName
    bGotGoodAttrSetName = False
    bGotGoodAttrName = False
    
    For Ctr2 = 1 To SelectSetCt Step 1
        Dim oSelectedObject2 As Object
        Set oSelectedObject2 = ObjectColl.Item(Ctr2)
        
        ' Make sure the selected object supports attributes.
        Dim oAttribSets As AttributeSets
        On Error Resume Next
        Set oAttribSets = oSelectedObject2.AttributeSets
        If Err Then
            MsgBox "The selected object does not support attributes."
            Exit Sub
        End If
        On Error GoTo 0
    
        Dim oAttribSet As AttributeSet
        Dim oAttrib As Inventor.Attribute
          
        If (bGotGoodAttrSetName = False) Then
            AttributeSetName = InputBox("Enter Name of Attribute Set", "Attribute Set Name", "Attr_Set_1")
        End If
        
        Do While oAttribSets.NameIsUsed(AttributeSetName)
            MsgBox "The Selected Name already is an attribute set."
            AttributeSetName = InputBox("Enter Name of Attribute Set", "Attribute Set Name", "Attr_Set_2")
        Loop
        Set oAttribSet = oAttribSets.Add(AttributeSetName)
        bGotGoodAttrSetName = True
          
        If (bGotGoodAttrName = False) Then
            AttributeName = InputBox("Enter Name of Attribute", "Attribute Name", "NS_1")
        End If
        
        Do While oAttribSet.NameIsUsed(AttributeName)
            MsgBox "The Selected Name already is an attribute."
            AttributeName = InputBox("Enter Name of Attribute", "Attribute Name", "NS_2")
        Loop
        Set oAttrib = oAttribSet.Add(AttributeName, kStringType, "NS_TEXT")
        bGotGoodAttrName = True
        'If oAttrib = Null Then
         ' Set oAttrib = oAttribSet.Item("NS_1")
        'End If
         ' oAttrib.Value = "NS_TEXT"
      
    Next Ctr2
    
End Sub
