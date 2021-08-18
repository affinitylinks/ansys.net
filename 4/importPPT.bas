Sub Insert_Picture_Series()
'
' PowerPoint Macro recorded 3/11/2003 by Mark C. Tate
'
    Dim icount, istart, istop, DotPosition, inum, SeqNum, LastSlide As
Integer
    Dim Max_num, Min_num As Integer
    Dim Answer, root, extension, strTitle, Cur_Dir, strFile As String
    Dim jjnum, PictureFile(1000) As String
    Dim MyFile As String
        
'  Read variables
    root = InputBox("What is the root name?")
'  extension = InputBox("What is the file extension name?")
    extension = "JPG"
' Import a picture
' Returns filename with specified extension. If more than one
' file exists, the first file found is returned.
Cur_Dir = "m:\transfer\TATE\"
MyFile = Dir(Cur_Dir & root & "*." & extension)

SeqNum = 0
Max_num = 0
Min_num = 1000
Erase PictureFile
While MyFile <> ""

    DotPosition = InStr(MyFile, ".")
    jjnum = Mid(MyFile, DotPosition - 2, 1)
    If Str(Val(jjnum)) = " " & jjnum Then
        SeqNum = Val(Mid(MyFile, DotPosition - 2, 2)) + 1
        jjnum = Mid(MyFile, DotPosition - 2, 2)
    Else
        SeqNum = Val(Mid(MyFile, DotPosition - 1, 1))
        jjnum = "10" & Mid(MyFile, DotPosition - 1, 1)
    End If
    If SeqNum < Min_num Then Min_num = SeqNum
    If SeqNum > Max_num Then Max_num = SeqNum
    PictureFile(SeqNum) = Cur_Dir & MyFile
    MyFile = Dir
Wend 'End of Files

NoMoreFiles:
inum = 0
For icount = Min_num To Max_num

 strFile = PictureFile(icount)
   If strFile <> "" Then
    inum = inum + 1
    With ActivePresentation.Slides
    .Add .Count + 1, ppLayoutTitleOnly
    LastSlide = .Count
    End With
 With Application.ActiveWindow
    .ViewType = ppViewSlide
    .View.GotoSlide LastSlide
 End With

    ActiveWindow.Selection.SlideRange.Shapes.AddPicture(FileName:=strFile, _
        LinkToFile:=msoFalse, SaveWithDocument:=msoTrue, Left:=14, Top:=10,
Width:=584, Height:=438).Select
    With ActiveWindow.Selection.ShapeRange
        .IncrementLeft 66
        .IncrementTop 66
    End With
    strTitle = "Figure " & CStr(LastSlide) & ".  " & strFile
    ActiveWindow.Selection.SlideRange.Shapes("Rectangle 2").Select
    ActiveWindow.Selection.ShapeRange.TextFrame.TextRange.Select
 
ActiveWindow.Selection.ShapeRange.TextFrame.TextRange.Characters(Start:=1,
Length:=0).Select
    With ActiveWindow.Selection.TextRange
        .Text = strTitle
        With .Font
            .Name = "Times New Roman"
            .Size = 16
            .Bold = msoFalse
            .Italic = msoFalse
            .Underline = msoFalse
            .Shadow = msoFalse
            .Emboss = msoFalse
            .BaselineOffset = 0
            .AutoRotateNumbers = msoFalse
            .Color.SchemeColor = ppTitle
        End With
        ActiveWindow.Selection.ShapeRange.TextFrame.AutoSize =
ppAutoSizeShapeToFitText
    End With
    With ActiveWindow.Selection.ShapeRange
        .IncrementLeft 10#
        .IncrementTop -42#
    End With
    ActiveWindow.Selection.Unselect
   End If

Next icount
endofprogram:
End Sub
