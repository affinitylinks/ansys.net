Sub macro1()
'Attribute macro2.VB_Description = "Macro created 12/06/02 by Gary Betts"
'Attribute macro2.VB_ProcData.VB_Invoke_Func = "Normal.NewMacros.ClearAutotextlist"
'
' Macro1
' Macro created 12/06/02 by Gary Betts
'
With Application.FileSearch
    .NewSearch
    .LookIn = CurDir        'CurDir may be replaced with a path e.g "C:\mypics"
    .FileName = ".jpg"
    If .Execute(SortBy:=msoSortByFileName, _
    SortOrder:=msoSortOrderAscending) > 0 Then
        MsgBox "There were " & .FoundFiles.Count & _
            " file(s) found."
        For i = 1 To .FoundFiles.Count
            Selection.InlineShapes.AddPicture FileName:=.FoundFiles(i),LinkToFile:=False, SaveWithDocument:=True
'            Selection.InsertBreak Type:=wdPageBreak
        Next i
    Else
        MsgBox "There were no files found."
    End If
End With
End Sub
